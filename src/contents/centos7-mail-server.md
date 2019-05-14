---
path: "/posts/centos7-mail-server"
title: CentOS 7 Mail Server 구축하기 Postfix + Dovecot 
date: 2018-09-28 22:36:10
categories: Linux
tags: ["Linux"]
author: "y0c"
banner: ../images/banner/default.jpg
---

메일서버를 구축할일이 생겨서 간단하게 Postfix와 Dovecot개념을 익힐겸 구축해보았다. 
이번 포스팅은 간단하게 Postfix+Dovecot를 이용해 SMTP, IMAP 서버를 구축하는 과정에대해 작성해보려 한다. 

먼저 설치와 셋팅에 앞서서 도메인의 DNS를 먼저 셋팅해주도록 하자. 
일반적으로 도메인이 example.com 이라면 메일서버는 mail.example.com 서브도메인을 활용하게 된다. 
mail.example.com 의 A레코드를 먼저 등록한 후 example.com 의 MX레코드를 mail.example.com으로 설정한다. 

먼저 yum을 update해준다. 
`yum -y update`

## Postfix

완료되었다면 아마 postfix가 설치되어있을 것이다. 
만약 없을경우 설치해주도록 하자. 
`yum -y install postfix`

다음은 ssl인증서를 셋팅한다.(ssl을 이용하지 않는다면 필수사항이 아니다.)
```sh
mkdir /etc/postfix/ssl
cd /etc/postfix/ssl
```

ssl폴더로 이동했다면 openssl 을통해 key,crt 파일을 만든다. 
```sh
openssl req -x509 -nodes -newkey rsa:2048 -keyout server.key -out server.crt -nodes -days 365
```

이제 postfix 설정을 수정한다. 

```sh
vi /etc/postfix/main.cf
```

아래 나와있는 설정들을 현재 상황에 맞게 수정하도록 한다. 
없는부분이 있을시엔 추가하도록 한다. 
```sh
myhostname = mail.yourdomain.com
mydomain = yourdomain.com
myorigin = $mydomain
home_mailbox = mail/
mynetworks = 127.0.0.0/8
inet_interfaces = all
inet_protocols = all
mydestination = $myhostname, localhost.$mydomain, localhost, $mydomain
smtpd_sasl_type = dovecot
smtpd_sasl_path = private/auth
smtpd_sasl_local_domain =
smtpd_sasl_security_options = noanonymous
broken_sasl_auth_clients = yes
smtpd_sasl_auth_enable = yes
smtpd_recipient_restrictions = permit_sasl_authenticated,permit_mynetworks,reject_unauth_destination
smtp_tls_security_level = may
smtpd_tls_security_level = may
smtp_tls_note_starttls_offer = yes
smtpd_tls_loglevel = 1
smtpd_tls_key_file = /etc/postfix/ssl/server.key
smtpd_tls_cert_file = /etc/postfix/ssl/server.crt
smtpd_tls_received_header = yes
smtpd_tls_session_cache_timeout = 3600s
tls_random_source = dev:/dev/urandom
```

다음은 master.cf파일을 수정한다. 

```sh
vi /etc/postfix/master.cf
```

아래와 다르게 주석이 되있는부분들은 해제하도록 한다. 
```sh
smtp      inet  n       -       n       -       -       smtpd
#smtp      inet  n       -       n       -       1       postscreen
#smtpd     pass  -       -       n       -       -       smtpd
#dnsblog   unix  -       -       n       -       0       dnsblog
#tlsproxy  unix  -       -       n       -       0       tlsproxy
submission inet n       -       n       -       -       smtpd
  -o syslog_name=postfix/submission
  -o smtpd_tls_security_level=encrypt
  -o smtpd_sasl_auth_enable=yes
  -o smtpd_reject_unlisted_recipient=no
#  -o smtpd_client_restrictions=$mua_client_restrictions
#  -o smtpd_helo_restrictions=$mua_helo_restrictions
#  -o smtpd_sender_restrictions=$mua_sender_restrictions
  -o smtpd_recipient_restrictions=permit_sasl_authenticated,reject
  -o milter_macro_daemon_name=ORIGINATING
smtps     inet  n       -       n       -       -       smtpd
  -o syslog_name=postfix/smtps
  -o smtpd_tls_wrappermode=yes
  -o smtpd_sasl_auth_enable=yes
  -o smtpd_reject_unlisted_recipient=no
#  -o smtpd_client_restrictions=$mua_client_restrictions
#  -o smtpd_helo_restrictions=$mua_helo_restrictions
#  -o smtpd_sender_restrictions=$mua_sender_restrictions
  -o smtpd_recipient_restrictions=permit_sasl_authenticated,reject
  -o milter_macro_daemon_name=ORIGINATING
```

## Dovecot
IMAP/POP3로 이메일을 수신할 수 있도록 Dovecot를 설치하자. 

```sh
yum -y install dovecot
```

이제 설정을 수정하도록 하자.
```sh
vi /etc/dovecot/conf.d/10-master.conf
```

smtp-auth를 찾아서 아래와같이 설정한다. 
```sh
# Postfix smtp-auth
unix_listener /var/spool/postfix/private/auth {
	mode = 0660
	user = postfix
	group = postfix
}

```

auth 설정을 수정한다. 
```sh
vi /etc/dovecot/conf.d/10-auth.conf
```

auth_mechanisms을 찾아서 뒤에 login을 붙여준다. 아마 plain으로 되어있을것이다.
```sh
auth_mechanisms = plain login

# 이 설정은 안해주면 계정을 입력할때 Test@example.com 이 아니라 Test로 입력해야 로그인 된다. 
# 꼭 설정해주도록 하자.
auth_username_format = %Ln
```

mail location 을 지정한다. 
```sh
vi /etc/dovecot/conf.d/10-mail.conf
```
이 부분은 위에 home_mailbox와 맞춰주어야 한다. 
제대로 설정되어있지 않으면 나중에 메일수신이 안될 수 있다. 
```sh
mail_location = maildir:~/mail
```

다음은 pop3 설정이다. 
```sh
vi /etc/dovecot/conf.d/20-pop3.conf
```

아래 라인이 주석처리를 해제한다. 
```sh
pop3_uidl_format = %08Xu%08Xv 
```

서비스를 재시작해서 모든 설정을 적용한다. 
```sh
systemctl restart postfix
systemctl enable postfix
systemctl restart dovecot
systemctl enable dovecot
```

관련포트를 firewall에 추가해주고 테스트하도록 하자. 
```sh
firewall-cmd --permanent --add-service=smtp
firewall-cmd --permanent --add-port=587/tcp
firewall-cmd --permanent --add-port=465/tcp
firewall-cmd --permanent --add-port=110/tcp
firewall-cmd --permanent --add-service=pop3s
firewall-cmd --permanent --add-port=143/tcp
firewall-cmd --permanent --add-service=imaps
firewall-cmd --permanent --add-service=http
firewall-cmd --reload
```

테스트시에는 telnet이나 [MXToolbox](https://mxtoolbox.com/)를 이용하면 된다. 
간단히 테스트가 성공했다면 Outlook, 혹은 이메일 클라이언트에 연결해서 동작을 확인하면 된다. 
이메일 클라이언트로 연결시 계정은 기본적으로 리눅스 계정이 공유된다. 
```sh
adduser test
passwd test

# mail directory 
# /home/test/mail
```
간단하게 만들어서 테스트해볼 수 있다. 

계정은 이외에도 mysql이나 다른방법으로 관리할 수 있는 것 같다. 
[postfix & mysql](https://www.linode.com/docs/email/postfix/email-with-postfix-dovecot-and-mysql/)

## 마무리 
위 과정들이 어렵다면 사실 docker를 이용해서 관련 이미지를 받아서 사용할 수 있다. 
이미 잘 설정되어있는 이미지들이 조금 검색하면 많이나오는 편이다. 
하지만 관련설정을 모를시 혼동이 있을 수 있으므로 vm에서라도 간단히 테스트해보면 좋을 것 같다. 


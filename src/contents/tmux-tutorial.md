---
path: "/posts/tmux-tutorial"
title: Tmux Tutorial 정리 
date: 2018-09-27 12:18:51
banner: ../images/banner/tmux.png
categories: Tmux
tags: ["tmux", "tool"]
author: "y0c"
---
필자는 Editor중 Vim을 선호하고 주로 사용하는 편이다. 

Vim을 사용할때 보통 두가지 방법으로 사용하게 된다.
* IDE 설치후 Vim 플러그인을 통하여 사용
* Terminal에서 Vim을 사용 

필자는 주로 첫 번째 방법을 통해서 사용하였다.  
회사에선 주로 Java, Spring계열의 Backend 개발을 하다보니 IDE에 의존적인 기능들이 좀 많았던게 이유이다. 하지만 사이드 프로젝트 개발은 주로 Terminal과 Text Editor로써의 기능을 사용하는 것 같아서 Terminal을 통한 개발환경도 괜찮지 않을까? 라는 생각이들어서 시도해보게 되었다. 

이번에 Terminal기반의 Vim 개발환경을 만들때 Tmux라는 것을 알게되었다. 
이번 포스팅은 Tmux에 대한 간단한 Tutorial 과 사용법을 적어보려 한다. 
/VIm 플러그인이나 사용경험에 대해서는 별도의 포스팅을 작성할 예정이다./

## Tmux 
Tmux는 TTY 멀티플렉서 이다.  쉽게 말하자면 하나의 터미널에서 여러개의 터미널로 분할하여 사용할 수 있고. 세션을 생성하여 attach/detach 를 할 수 있다. 
Mac OS의 ITerm2와 같은 터미널을 사용하게 되면 기본적으로 화면분할을 제공하는데 Tmux는 기본적인 화면분할과 더불어 세션기능을 제공한다. 
ssh를 통해 원격으로 작업하다가 종료후 재접속 한 후 tmux session에 다시 attach만 해주면 기존의 작업환경을 그대로 사용할 수 있다. 이외에도 단축키와 여러 plugin을 설치해서 사용할 수 있으므로 Mac OS의 ITerm과는 조금 다른 종류라고 보는게 좋을것 같다. 

아래 내용에선 Tmux 설치 부터 단축키 Plugin 설치 및 관리방법을 위주로 작성하려한다

## Installation 
Mac OS 
`brew install tmux`

## Tmux 용어 
* 프리픽스(prefix)
단축키입력전에 입력해야하는 키 조합이다. 기본적으로 `ctrl + b`
조합키가 아니라 `명령모드` 같은 개념이다.
* 세션(session)
Tmux에서 관리하는 가장 큰 단위 
* 윈도우(window)
세션에 존재하는 탭
* 팬(pane)
윈도우에 존재하는 화면 단위 

## Config 
`vi ~/.tmux.conf`

Reload 시에는 
`tmux source ~/.tmux.conf`
명령을 통해서 config를 reload 할 수 있다. 

## Shortcut
 Session 시작
```sh
tmux
# with session name
tmux new -s <session_name>
```

Session 목록 
```sh
tmux ls
```

Session 종료 
```sh
tmux kill-session -t <session_name>

# kill all tmux session 
tmux ls | grep : | cut -d. -f1 | awk '{print substr($1, 0, length($1)-1)}' | xargs kill

# Server shutdown
tmux kill-server
```

Session attach 
```sh
tmux attach -t <session_name>

# or 
tmux a -t ...
```

아래 단축키들은 Session attach 후 명령모드에서만 작동한다. 
즉, prefix(ctrl+a)를 먼저 입력한 후에 아래키들이 동작한다고 보면된다. 

### Session 
```sh
:new<CR>  new session
s  list sessions
$  name session
```

### Window 
```sh
c  create window
w  list windows
n  next window
p  previous window
f  find window
,  name window
&  kill window
```

### Panes(Splits)
```sh
%  vertical split
"  horizontal split

o  swap panes
q  show pane numbers
x  kill pane
+  break pane into window (e.g. to select text by mouse to copy)
-  restore pane from window
⍽  space - toggle between layouts
<prefix> q (Show pane numbers, when the numbers show up type the key to goto that pane)
<prefix> { (Move the current pane left)
<prefix> } (Move the current pane right)
# 하나의 팬을 전체화면으로 유용하게 사용
<prefix> z toggle pane zoom
```


## Plugin 
Tmux는 다양한 Plugin으로 커스터마이징이 가능하다. 구글링을 좀 해보면 상태바를 이쁘게 만드는 방법이나 키매핑을 편리하게해주거나 등 다양한 플러그인이 있으니 찾아보면 된다. 여기선 기본적으로 플러그인을 설치하는 방법만 적어보려한다. 
먼저 패키지 매니저인 [TPM](https://github.com/tmux-plugins/tpm)을 설치한다.  설치가 정상적으로 됬다면 그후론 `~/.tmux.conf` 에 설치할 플러그인 목록을 작성한후 `<prefix> + I` 로 설치할 수 있다.  자세한내용은 [TPM](https://github.com/tmux-plugins/tpm)  repo의 README를 참고하도록 하자.  

필자가 사용중인 플러그인 목록이다. 
* [tmux-resurrect](https://github.com/tmux-plugins/tmux-resurrect)
* [tmux-cpu-mem-load](https://github.com/thewtex/tmux-mem-cpu-load)
* [tmux-pane-control](https://github.com/tmux-plugins/tmux-pain-control)

## 참고 
https://blog.outsider.ne.kr/699
https://www.haruair.com/blog/2124
https://gist.github.com/MohamedAlaa/2961058
https://bluesh55.github.io/2016/10/10/tmux-tutorial/

## 마무리 
그냥 터미널에서 Vim을 좀 더 편하게 사용해보려고 시작했지만 이외의 용도로도 유용하게 사용할 수 있을것같다. 꼭 vim과 같이 사용하지 않더라도 서버에 깔아두거나 mac에서 사용하기에 장점이 많은 것 같다. 페어프로그래밍에도 쓰일 수 있다는데 기회가 되면 해보고 싶다. 

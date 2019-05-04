## How to Contribute

SAT10AM 스터디원은 자유롭게 Contribution 을 올려주실 수 있습니다. 

좀 더 원활한 협업을 위해서 아래 Guide를 읽어주시고 작업해주시면 갑사합니다. 🧐

## 📚 Issue 작성 가이드 
* Issue 를 남겨주신 후 꼭 라벨링을 부탁드립니다.  
* 해당 Issue와 관련해서 좋은 Reference를 같이 남겨놓으시면 작업하시는 분이 더 수월합니다.
* 버그와 같은 경우엔 어떤 환경에서 재현되는지 정확하게 기술해주시면 좋습니다.
* 기술적으로 어려운 부분이 있다면 `Question` Label 로 올려주시면 다른분과 공유할 수 있어요.
* 디자인 변경과 같은 부분은 텍스트 보다는 간단한 스케치가 같이 첨부되면 토론하기 수월합니다.

Issue 작성 시 Label 이 어떤것들이 있는지 한 번 확인해 주세요!

## 📚 Contribution Flow 
* 먼저기여하고 싶은 작업이 있다면 `Issue`를 생성하거나 만들어진 `Issue`에 Assign 해주세요
* Project 관리도구로 `Github Project Board`를 사용하고 있습니다. 작업 중인 `Issue`는 `In Progress`로 옮겨주세요 
* Issue 번호로 브랜치를 만들어 주세요 (아래 브랜치 및 커밋 가이드 참고)
* 작업이 완료되었다면 PR을 올려주세요
* 코드 리뷰 
* `dev` 브랜치 merge
* 추후 `master` 브랜치 merge

코드 리뷰는 오타, 코드 중복, 코드 구조 등 생각을 자유롭게 표현해주세요. 

리뷰할 내용이 없거나 리뷰를 마치셨다면 `Approve` 를 눌러주시면 됩니다.
 

## 📚 Branch Naming Guide 
`Issue` 번호를 넣어서 브랜치 이름을 지어주세요. 

iss-<이슈번호>-<이슈내용(간략)>

ex) iss-18-google-analytics

## 📚 Commit Message Guide 
Commit Message는 보기 좋은 History를 위해서 아래와 같은 Guide를 권장합니다.

prefix: <이모지> <작업 내용> (#<관련이슈번호>)

ex) feat: ⚡️ add google analytics plugin & config

### Prefix
* `feat` - 신규 기능을 추가
* `refactor` - 코드 내부 구조를 변경
* `chore` - 실제 코드 동작과는 관련 없는 `config` or `script`
* `doc` - 문서에 관련된 작업
* `fix` - Bug 수정
* `style` - 코드 스타일 수정(Design 아닙니다!)

### Emoji
* `feat` - ⚡️
* `refactor` - 🛠
* `chore` - 📦
* `doc` - 📚
* `fix` - 🔥
* `style` - 💄

본 내용과 관련해서 더 추가하고 싶은 부분이 있다면 언제든 `PR`을 올려주세요. 

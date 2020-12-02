# 부산 교차로 감시하기
Used API - [부산광역시 교통정보서비스 센터 CCTV 현황](https://www.data.go.kr/tcs/dss/selectApiDataDetailView.do?publicDataPk=15034450)


### Install & Run
yarn install && yarn run start

### Major Issue
The iframe'd live CCTV streaming website doesn't host the page via HTTPS so the live video only plays on local machine; the whole point was to do that :(

프로토타입 url : https://han.gl/RLVOX

모델은 백엔드 폴더 내 view.py 파일에서 확인가능합니다
- initial_func() : 모델 적용 (최초 1회 실행) -> 모델 pickle에 저장
- correct_spelling() : 맞춤법 수정 기능
- sentence_search() : 문장검색기능. 쿼리(keyword)에 문장입력시 출력 -> 위에 학습한 pickle 모델 읽어와 적용
- word_search() : 단어검색
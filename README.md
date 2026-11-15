# SecondBrain Quartz 위키

Obsidian 노트의 **속성 → 태그**에 `publish`를 추가하고 비공개 볼트의 `main`에 동기화하면 노트가 공개됩니다.

```yaml
---
tags:
  - publish
---
```

태그를 제거하고 다시 동기화하면 다음 배포에서 이전 문서 URL이 404를 반환합니다. 공개 문서가 참조하는 지원 형식의 첨부도 함께 공개합니다.

비공개 저장소의 `main`에 푸시하면 GitHub Actions가 배포를 시작합니다. 배포가 끝난 뒤에도 기존 주소는 GitHub Pages 캐시에 잠시 남을 수 있습니다. 수동으로 다시 배포하려면 [Deploy Quartz wiki](https://github.com/HighCl/Obsidian_SecondBrain_Web/actions/workflows/deploy.yml)에서 **Run workflow**를 실행하십시오.

[Quartz 위키 열기](https://highcl.github.io/Obsidian_SecondBrain_Web/)

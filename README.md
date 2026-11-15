# SecondBrain Quartz 위키

Obsidian 노트의 **속성 → 태그**에 `publish`를 추가하고 비공개 볼트의 `main`에 동기화하면 노트가 공개됩니다.

```yaml
---
tags:
  - publish
---
```

태그를 제거하고 다시 동기화하면 다음 배포에서 이전 문서 URL이 404를 반환합니다. 공개 문서가 참조하는 지원 형식의 첨부도 함께 공개합니다.

GitHub Actions는 10분 간격으로 배포를 예약합니다. 대기열에 따라 늦어질 수 있습니다. 바로 반영하려면 [Deploy Quartz wiki](https://github.com/HighCl/Obsidian_SecondBrain_Web/actions/workflows/deploy.yml)에서 **Run workflow**를 실행하십시오.

[Quartz 위키 열기](https://highcl.github.io/Obsidian_SecondBrain_Web/)

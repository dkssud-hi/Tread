#!/usr/bin/env bash
# Stop hook: 코드(app/components/lib/types/data)가 바뀌었는데 docs/가 함께
# 갱신되지 않은 채 턴을 마치려 하면 문서 동기화 검토를 요청(block)한다.

input=$(cat)

# 무한 루프 방지: Stop hook으로 이미 한 번 막아 재진입한 경우 통과
if printf '%s' "$input" | grep -Eq '"stop_hook_active"[[:space:]]*:[[:space:]]*true'; then
  exit 0
fi

cd "c:/workspace/tread" 2>/dev/null || exit 0

# working tree 변경 경로만 추출 (porcelain의 XY+공백 3자 제거, rename은 화살표 뒷부분)
paths=$(git status --porcelain 2>/dev/null | sed -e 's/^...//' -e 's/.* -> //')
[ -z "$paths" ] && exit 0

code=$(printf '%s\n' "$paths" | grep -E '^(app/|components/|lib/|types/|data/)' | head -n1)
docs=$(printf '%s\n' "$paths" | grep -E '^docs/' | head -n1)

if [ -n "$code" ] && [ -z "$docs" ]; then
  reason='코드 변경(app/components/lib/types/data)이 감지되었으나 docs/ 문서가 함께 갱신되지 않았습니다. 마무리 전에 docs/ARCHITECTURE.md(스키마·필터 축·API 명세·디렉터리 구조)와 docs/TASKS.md(완료/추가 작업 항목)의 갱신 필요 여부를 검토하고, 신규 영역이면 docs/ 하위에 설계 문서가 필요한지 확인하세요. 필요하면 해당 문서를 작성/수정한 뒤 마무리하고, 정말 불필요하다면 그 이유를 한 줄로 밝히세요.'
  printf '{"decision":"block","reason":"%s"}\n' "$reason"
fi

exit 0

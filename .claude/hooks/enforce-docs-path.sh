#!/usr/bin/env bash
# PreToolUse(Write) hook: 규칙·설계 .md 문서를 프로젝트 루트에 쓰려 하면 차단한다.
# CLAUDE.md / README.md 는 루트에 있어야 하므로 예외.

input=$(cat)

# tool_input.file_path 값 추출 (경로에 " 없음 가정)
fp=$(printf '%s' "$input" \
  | grep -oE '"file_path"[[:space:]]*:[[:space:]]*"[^"]*"' \
  | head -n1 \
  | sed -E 's/.*"file_path"[[:space:]]*:[[:space:]]*"//; s/"$//')

[ -z "$fp" ] && exit 0

# JSON 이스케이프된 백슬래시 → 슬래시 정규화
fp=$(printf '%s' "$fp" | sed 's#\\\\#/#g; s#\\#/#g')

# .md 만 대상
case "$fp" in
  *.md) ;;
  *) exit 0 ;;
esac

base=${fp##*/}

# 루트 허용 문서
case "$base" in
  CLAUDE.md|README.md) exit 0 ;;
esac

# 부모 디렉터리
dir=${fp%/*}
[ "$dir" = "$fp" ] && dir="."

# 드라이브 문자 소문자화 + 끝 슬래시 제거 후 루트와 비교
dl=$(printf '%s' "$dir" | tr 'A-Z' 'a-z' | sed 's#/\+$##')

if [ "$dir" = "." ] || [ "$dl" = "c:/workspace/tread" ]; then
  printf '%s\n' "❌ 규칙·설계 문서는 docs/ 하위에 저장해야 합니다." >&2
  printf '   현재 경로: %s\n' "$fp" >&2
  printf '   올바른 경로: docs/%s\n' "$base" >&2
  exit 2
fi

exit 0

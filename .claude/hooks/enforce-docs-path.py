import sys
import json
import os

try:
    d = json.load(sys.stdin)
    fp = d.get("tool_input", {}).get("file_path", "")

    if not fp.endswith(".md"):
        sys.exit(0)

    bn = os.path.basename(fp)

    # 루트에 있어야 하는 파일 제외
    if bn in ("CLAUDE.md", "README.md"):
        sys.exit(0)

    root = os.path.normcase(os.path.abspath(r"c:\workspace\tread"))
    parent = os.path.normcase(os.path.abspath(os.path.dirname(fp) if os.path.dirname(fp) else "."))

    if parent == root:
        print(f"❌ 규칙·설계 문서는 docs/ 하위에 저장해야 합니다.")
        print(f"   현재 경로: {fp}")
        print(f"   올바른 경로: docs/{bn}")
        sys.exit(2)

except Exception:
    pass

sys.exit(0)

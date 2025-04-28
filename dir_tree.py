import os
import argparse


def build_tree(root_path: str, prefix: str = "") -> list[str]:
    """
    建立指定目錄的樹狀結構清單，並忽略 .git 目錄。

    :param root_path: 要掃描的根目錄路徑
    :param prefix: 每行前綴字串，用於顯示樹枝
    :return: 包含每行文字的列表
    """
    lines: list[str] = []
    try:
        entries = sorted(os.listdir(root_path))
        # 忽略 .git 資料夾
        entries = [e for e in entries if e != '.git']
    except PermissionError:
        lines.append(prefix + "[無存取權限] " + os.path.basename(root_path))
        return lines

    for index, name in enumerate(entries):
        path = os.path.join(root_path, name)
        is_last = index == len(entries) - 1
        connector = '└── ' if is_last else '├── '
        lines.append(prefix + connector + name)

        if os.path.isdir(path):
            extension = '    ' if is_last else '│   '
            lines.extend(build_tree(path, prefix + extension))

    return lines


if __name__ == '__main__':
    parser = argparse.ArgumentParser(
        description='列印或匯出目錄樹狀結構，並忽略 .git 目錄'
    )
    parser.add_argument(
        'path', nargs='?', default='.',
        help='要分析的工作目錄，預設為當前目錄'
    )
    args = parser.parse_args()

    root = os.path.abspath(args.path)
    lines = [root] + build_tree(root)

    # 將結果寫入當前工作目錄下的 dir_tree.txt
    output_file = os.path.join(os.getcwd(), 'dir_tree.txt')
    try:
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write("\n".join(lines))
        print(f'已將結果匯出至 {output_file}')
    except Exception as e:
        print(f'寫入 {output_file} 時發生錯誤: {e}')

import os

def delete_ds_store(directory):
    count = 0
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file == '.DS_Store':
                file_path = os.path.join(root, file)
                try:
                    os.remove(file_path)
                    print(f"Deleted: {file_path}")
                    count += 1
                except Exception as e:
                    print(f"Error deleting {file_path}: {e}")
    return count

if __name__ == "__main__":
    base_directory = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    deleted_count = delete_ds_store(base_directory)
    print(f"刪除了 {deleted_count} 個 macOS Shit")
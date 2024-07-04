import ipfshttpclient

class IPFSStorage:
    def __init__(self, ipfs_url):
        self.ipfs = ipfshttpclient.connect(ipfs_url)

    def add_file(self, file_path):
        with open(file_path, 'rb') as f:
            file_hash = self.ipfs.add(f)
        return file_hash

    def get_file(self, file_hash):
        file_content = self.ipfs.cat(file_hash)
        return file_content

# Example usage
ipfs_storage = IPFSStorage('http://localhost:5001')
file_hash = ipfs_storage.add_file('image.jpg')
file_content = ipfs_storage.get_file(file_hash)
print(file_content)

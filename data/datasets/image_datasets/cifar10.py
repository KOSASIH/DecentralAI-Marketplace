import torchvision.datasets as datasets

def get_cifar10_dataset(data_dir, train=True, download=True):
    if train:
        dataset = datasets.CIFAR10(data_dir, train=True, download=download, transform=None)
    else:
        dataset = datasets.CIFAR10(data_dir, train=False, download=download, transform=None)
    return dataset

# Example usage
train_dataset = get_cifar10_, file_hash):
        file_content = self.ipfs.cat(file_hash)
        return file_content

# Example usage
ipfs_storage = IPFSStorage('http://localhost:5001')
file_hash = ipfs_storage.add_file('image.jpg')
file_content = ipfs_storage.get_file(file_hash)
print(file_content)

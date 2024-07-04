import torchvision.transforms as transforms

def get_data_augmentation():
    data_transforms = transforms.Compose([
        transforms.RandomHorizontalFlip(),
        transforms.RandomRotation(10),
        transforms.RandomResizedCrop(224),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
    ])
    return data_transforms

# Example usage
data_transforms = get_data_augmentation()
image = torch.randn(3, 224, 224)
transformed_image = data_transforms(image)
print(transformed_image.shape)

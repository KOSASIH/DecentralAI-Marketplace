import React from 'react';
importdataset('data', train=True)
test_dataset = get_cifar10_dataset('data', train=False)
print(len(train_dataset))
print(len(test_dataset))

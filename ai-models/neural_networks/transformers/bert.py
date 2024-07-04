import torch
import torch.nn as nn
import torch.optim as optim
from transformers import BertTokenizer, BertModel

class BertForSequenceClassification(nn.Module):
    def __init__(self, num_labels):
        super(BertForSequenceClassification, self).__init__()
        self.bert = BertModel.from_pretrained('bert-base-uncased')
        self.dropout = nn.Dropout(0.1)
        self.classifier = nn.Linear(self.bert.config.hidden_size, num_labels)

    def forward(self, input_ids, attention_mask, labels=None):
        outputs = self.bert(input_ids, attention_mask=attention_mask)
        pooled_output = outputs.pooler_output
        pooled_output = self.dropout(pooled_output)
        outputs = self.classifier(pooled_output)
        return outputs

# Load pre-trained BERT model and tokenizer
tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
model = BertForSequenceClassification(num_labels=8)

# Example usage
input_ids = torch.tensor([[101, 102, 103, 104, 105]])
attention_mask = torch.tensor([[1, 1, 1, 1, 1]])
labels = torch.tensor([1])
outputs = model(input_ids, attention_mask, labels)
print(outputs)

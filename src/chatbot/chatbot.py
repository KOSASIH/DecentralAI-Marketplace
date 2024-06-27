# chatbot.py
import nltk
from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.metrics import accuracy_score
from transformers import AutoModelForSequenceClassification, AutoTokenizer

class Chatbot:
    def __init__(self):
        self.lemmatizer = WordNetLemmatizer()
        self.classifier = MultinomialNB()
        self.tokenizer = AutoTokenizer.from_pretrained('bert-base-uncased')
        self.model = AutoModelForSequenceClassification.from_pretrained('bert-base-uncased', num_labels=8)

    def train(self, dataset):
        X, y = [], []
        for text, label in dataset:
            tokens = word_tokenize(text)
            tokens = [self.lemmatizer.lemmatize(token) for token in tokens]
            X.append(' '.join(tokens))
            y.append(label)
        self.classifier.fit(X, y)

    def respond(self, user_input):
        tokens = word_tokenize(user_input)
        tokens = [self.lemmatizer.lemmatize(token) for token in tokens]
        input_text = '.join(tokens)
        prediction = self.classifier.predict([input_text])[0]
        return prediction

    def fine_tune_bert(self, dataset):
        inputs = self.tokenizer(dataset['text'], return_tensors='pt', max_length=512, truncation=True)
        labels = torch.tensor(dataset['label'])
        self.model.train()
        optimizer = torch.optim.Adam(self.model.parameters(), lr=1e-5)
        for epoch in range(5):
            optimizer.zero_grad()
            outputs = self.model(inputs['input_ids'], attention_mask=inputs['attention_mask'])
            loss = torch.nn.CrossEntropyLoss()(outputs, labels)
            loss.backward()
            optimizer.step()
        self.model.eval()

# Example usage:
dataset = [
    ('Hello, how can I help you?', 'greeting'),
    ('I want to buy a product', 'purchase'),
    ('I have a question about my order', 'upport')
]
chatbot = Chatbot()
chatbot.train(dataset)
user_input = 'Hi, I need help with my order'
response = chatbot.respond(user_input)
print(response)

chatbot.fine_tune_bert(dataset)

# ai_recommender.py
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.decomposition import NMF
from sklearn.metrics import accuracy_score

class AIRecommender:
    def __init__(self, dataset):
        self.dataset = dataset
        self.vectorizer = TfidfVectorizer()
        self.similarity_matrix = self.calculate_similarity_matrix()
        self.nmf_model = NMF(n_components=10, init='nndsvd')

    def calculate_similarity_matrix(self):
        tfidf_matrix = self.vectorizer.fit_transform(self.dataset['description'])
        return cosine_similarity(tfidf_matrix, tfidf_matrix)

    def recommend(self, user_id, num_recommendations):
        user_vector = self.vectorizer.transform([self.dataset.loc[user_id, 'description']])
        scores = self.similarity_matrix[user_id].flatten()
        top_indices = scores.argsort()[:-num_recommendations - 1:-1]
        return self.dataset.iloc[top_indices]

    def matrix_factorization(self):
        self.nmf_model.fit(self.similarity_matrix)
        W = self.nmf_model.components_
        H = self.nmf_model.transform(self.similarity_matrix)
        return W, H

    def predict_ratings(self, user_id, item_id):
        W, H = self.matrix_factorization()
        user_factors = W[user_id]
        item_factors = H[:, item_id]
        rating = np.dot(user_factors, item_factors)
        return rating

# Example usage:
dataset = pd.read_csv('marketplace_data.csv')
recommender = AIRecommender(dataset)
recommended_items = recommender.recommend(123, 5)
print(recommended_items)

predicted_rating = recommender.predict_ratings(123, 456)
print(predicted_rating)

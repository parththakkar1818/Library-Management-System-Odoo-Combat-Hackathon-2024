import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from tabulate import tabulate
import random

class BookRecommender:
    def __init__(self, csv_file):
        # Load the dataset
        self.df = pd.read_csv(csv_file)
        self._prepare_data()
        self._calculate_cosine_similarity()

    def _prepare_data(self):
        # Select relevant columns
        self.df = self.df[['title', 'authors', 'categories', 'averageRating']]

        # Fill NaN values with empty strings
        self.df['authors'] = self.df['authors'].fillna('')
        self.df['categories'] = self.df['categories'].fillna('')

        # Combine features for content-based filtering
        self.df['features'] = self.df['authors'] + ' ' + self.df['categories'] + ' ' + self.df['averageRating'].astype(str)

        # Replace any remaining NaN in features with empty string
        self.df['features'] = self.df['features'].fillna('')

    def _calculate_cosine_similarity(self):
        # Create TF-IDF vectorizer
        tfidf = TfidfVectorizer(stop_words='english')
        tfidf_matrix = tfidf.fit_transform(self.df['features'])

        # Calculate cosine similarity
        self.cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)

    def get_diverse_recommendations(self, past_books, num_recommendations=10):
        indices = []
        for book in past_books:
            try:
                idx = self.df.index[self.df['title'] == book].tolist()[0]
                indices.append(idx)
            except IndexError:
                print(f"Book '{book}' not found in the dataset.")

        if not indices:
            print("No valid books found. Cannot generate recommendations.")
            return pd.DataFrame()

        # Get the pairwise similarity scores
        sim_scores = []
        for idx in indices:
            sim_scores.extend(list(enumerate(self.cosine_sim[idx])))

        # Sort the books based on the similarity scores
        sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)

        # Remove duplicates and books already in past_books
        seen = set(indices)
        seen_titles = set(past_books)
        unique_sim_scores = []
        for i, score in sim_scores:
            if i not in seen and self.df.iloc[i]['title'] not in seen_titles:
                seen.add(i)
                seen_titles.add(self.df.iloc[i]['title'])
                unique_sim_scores.append((i, score))

        # Get diverse recommendations
        diverse_recommendations = []
        for i, score in unique_sim_scores:
            if len(diverse_recommendations) >= num_recommendations:
                break

            # Check if the book is sufficiently different from already selected recommendations
            if all(self.cosine_sim[i][j] < 0.5 for j in diverse_recommendations):
                diverse_recommendations.append(i)

        # Return the diverse recommendations with their details
        return self.df.iloc[diverse_recommendations][['title', 'authors', 'categories', 'averageRating']]

    def select_diverse_past_books(self, num_books=10):
        diverse_books = []
        diverse_book_indices = []
        total_books = len(self.df)
        seen_titles = set()

        while len(diverse_books) < num_books:
            random_idx = random.randint(0, total_books - 1)
            book_title = self.df.iloc[random_idx]['title']

            if book_title not in seen_titles and (not diverse_book_indices or all(self.cosine_sim[random_idx][i] < 0.5 for i in diverse_book_indices)):
                diverse_books.append(book_title)
                diverse_book_indices.append(random_idx)
                seen_titles.add(book_title)

        return diverse_books

    def save_recommendations_to_csv(self, recommendations, filename='recommended_books.csv'):
        recommendations.to_csv(filename, index=False)
        print(f"\nRecommendations saved to '{filename}'")

# Usage
if __name__ == "__main__":
    recommender = BookRecommender('google_books_dataset.csv')

    # Select diverse past books
    past_books = recommender.select_diverse_past_books()

    print("Past Books:")
    past_books_table = recommender.df[recommender.df['title'].isin(past_books)][['title', 'authors', 'categories', 'averageRating']]
    print(tabulate(past_books_table, headers='keys', tablefmt='grid', showindex=False))

    print("\nGenerating recommendations...")

    # Get diverse recommendations
    recommendations = recommender.get_diverse_recommendations(past_books)

    print("\nRecommended Books:")
    print(tabulate(recommendations, headers='keys', tablefmt='grid', showindex=False))

    # Save recommendations to CSV
    recommender.save_recommendations_to_csv(recommendations)

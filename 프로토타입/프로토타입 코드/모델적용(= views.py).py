from django.http import HttpResponse


import json
import csv
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np
from sentence_transformers import SentenceTransformer, util
import joblib
import pickle
from hanspell import spell_checker
from symspellpy_ko import KoSymSpell, Verbosity


sym_spell = KoSymSpell()
sym_spell.load_korean_dictionary(decompose_korean=True, load_bigrams=True)


def index(request):
    return HttpResponse('connected', content_type="text/plain; charset=utf-8")


def initial_func():
    embedder = None
    corpus_embeddings = None
    corpus = None

    print('1')
    law = pd.read_csv('./total2.csv')
    print('2')
    df = law
    df['호내용'] = df['호내용'].fillna('')
    df.isna().sum()

    embedder = SentenceTransformer("jhgan/ko-sroberta-multitask")
    print('3')
    df_wo = df.query('항내용.str.contains("연설 | 방송")',
                     engine='python')

    embedder.save('ails.h5')
    joblib.dump(embedder, 'ails.pkl')
    print('4')
    with open('ails.pkl', 'rb') as f:
        model = pickle.load(f)
    print('5')
    law.drop_duplicates(subset=['항내용'], inplace=True)

    embedder = SentenceTransformer("jhgan/ko-sroberta-multitask")

    embedder = model

    corpus = law['항내용'].to_list()

    corpus_embeddings = embedder.encode(
        corpus, convert_to_tensor=True)

    with open('embedder.pickle', 'wb') as f:
        pickle.dump(embedder, f)

    with open('corpus_embeddings.pickle', 'wb') as f:
        pickle.dump(corpus_embeddings, f)
    with open('corpus.pickle', 'wb') as f:
        pickle.dump(corpus, f)


def correct_spelling(str):
    re = spell_checker.check(str)
    tx = re.checked

    for x in sym_spell.lookup_compound(tx, max_edit_distance=2):
        text1 = x.term

    #################################
    corrected_str = [tx]  # 맞춤법이 틀린게 있으면 text1을 넣고 아니면 tx
    return corrected_str


def sentence_search(request, keyword):
    print(keyword, '시작')
    with open("election/embedder.pickle", "rb") as fi:
        embedder = pickle.load(fi)
    with open("election/corpus_embeddings.pickle", "rb") as fi:
        corpus_embeddings = pickle.load(fi)
    with open("election/corpus.pickle", "rb") as fi:
        corpus = pickle.load(fi)

    print(keyword, '끝')

    top_k = 10

    keyword = correct_spelling(keyword)

    print(keyword, 'keyword')

    for query in [keyword]:
        query_embedding = embedder.encode(
            query, convert_to_tensor=True)
        cos_scores = util.pytorch_cos_sim(
            query_embedding, corpus_embeddings)[0]
        cos_scores = cos_scores.cpu()

        top_results = np.argpartition(-cos_scores, range(top_k))[0:top_k]

        print("\n\n======================\n\n")
        print("Query:", query)
        print("\nTop 5 most similar sentences in corpus:")

        results = []
        for idx in top_results[0:top_k]:
            print(corpus[idx].strip(), "(Score: %.2f" %
                  (cos_scores[idx]*100), '%)', '\n')
        for idx in top_results[0:top_k]:
            if corpus[idx].strip() == '':
                continue
            result = {'content': corpus[idx].strip(
            ), 'score': "%.2f" % (cos_scores[idx]*100)}
            results.append(result)

    jsonString = json.dumps(results, ensure_ascii=False)

    return HttpResponse(jsonString, content_type="text/plain; charset=utf-8")


def word_search(request, keyword):
    print(str(keyword), 'str(keyword')
    law = pd.read_csv('election/total2.csv')
    with open('election/total2.csv', newline='') as law:

        reader = csv.DictReader(law)

        contents = []
        for idx, row in enumerate(reader):
            contents.append(row['항내용'])
        contents = list(set(contents))

        scores = []
        for idx, content in enumerate(contents):

            scores.append({'idx': idx, 'score': content.find(keyword)})

        sorted_result = sorted(
            scores, key=lambda x: (x['score']), reverse=True)

        def top_keyword_idx(num):
            return sorted_result[:num]

        def top_keywords(num):
            result = []
            for item in top_keyword_idx(num):
                result.append(
                    {'content': contents[item['idx']], 'score': None})
            return result

        results = top_keywords(5)

        jsonString = json.dumps(results, ensure_ascii=False)

        return HttpResponse(jsonString, content_type="text/plain; charset=utf-8")

# [Leaf Classification Competition: 1st Place Winner's Interview, Ivan Sosnovik](undefined)

    <<<![Leaf Classification Kaggle Playground Competition 1st Place Winners Interview](http://5047-presscdn.pagely.netdna-cdn.com/wp-content/uploads/2017/03/blog_leaf_classification_kaggle_competition_1st_place_winners_interview.png)

Can you see the random forest for its leaves? The [Leaf Classification playground competition][0] ran on Kaggle from August 2016 to February 2017\. Kagglers were challenged to correctly identify 99 classes of leaves based on images and pre-extracted features. In this winner's interview, Kaggler [Ivan Sosnovik][1] shares his first place approach. He explains how he had better luck using logistic regression and random forest algorithms over XGBoost or convolutional neural networks in this feature engineering competition.

![](http://5047-presscdn.pagely.netdna-cdn.com/wp-content/uploads/2016/10/section-divider.png)

## Brief intro

I am an MSc student in Data Analysis at Skoltech, Moscow. I joined Kaggle about a year ago when I attended my first ML course at university. The first competition was [What's Cooking][2]. Since that, I've participated in several Kaggle competitions, but didn't pay so much attention to it. It was more like a bit of practice to understand how ML approaches work.

[![Ivan Sosnovik on Kaggle.](http://5047-presscdn.pagely.netdna-cdn.com/wp-content/uploads/2017/03/Screen-Shot-2017-03-23-at-2.31.54-PM-1024x269.png)][1]

[Ivan Sosnovik][1] on Kaggle.

The idea of **Leaf Classification** was very simple and challenging. Seemed like I wouldn't have to stack so many models and the solution could be elegant. Moreover, the total volume of data was just 100+ Mb and the process of learning could be performed even with a laptop. It was very promising because the majority of the computations was supposed to be done on my MacBook Air with 1,3 GHz Intel Core i5 and 4 Gb RAM.

I have worked with black-and-white images before. And there is a forest near my house. However, it didn't give me so much profit in this competition.

## Let's get technical

When I joined the competition, several kernels with top 20% scores were published. The solutions used the initially extracted features and Logistic Regression. It gave ![logloss \approx 0.03818](http://5047-presscdn.pagely.netdna-cdn.com/wp-content/ql-cache/quicklatex.com-1a4691f61d2828848d9a14a487699b32_l3.png). And no significant improvement could be achieved by tuning of the parameters. In order to enhance the quality, feature engineering had to be performed. Seemed like no one had done it because the top solution had slightly better score than mine.

### Feature engineering

I did first things first and plotted the images for each of the classes.

![10 images from the train set for each of 7 randomly chosen classes.](http://5047-presscdn.pagely.netdna-cdn.com/wp-content/uploads/2017/03/all_leaves-1024x666.png)

10 images from the train set for each of 7 randomly chosen classes.

The raw images had different resolution, rotation, aspect ratio, width, and height. However, the variation of each of the parameters within the class is less than between the classes. Therefore, some informative features could be constructed just on the fly. They are:

* width and height
* aspect ration: `width / height`
* square: `width * height`
* is orientation horizontal: `int(width > height)` 

Another very useful feature that seemed to help is the average value of the pixels of the image. 

I added these features to the already extracted ones. Logistic regression enhanced the result. However, most of the work was yet to be done.

All of the above-described features represent nothing about the content of the image. 

##### PCA

Despite the success of neural networks as feature extractors, I still like PCA. It is simple and allows one to get the useful representation of the image in ![{\rm I\!R}^N](http://5047-presscdn.pagely.netdna-cdn.com/wp-content/ql-cache/quicklatex.com-fed61ba5d1c550c0a39b2d8773c55e4f_l3.png). First of all, the images were rescaled to the size of ![50 \times 50](http://5047-presscdn.pagely.netdna-cdn.com/wp-content/ql-cache/quicklatex.com-8a59d9d406b9557318f6800d0f57e32b_l3.png). Then PCA was applied. The components were added to the set of previously extracted features. 

![Eigenvalues of the covariance matrix.](http://5047-presscdn.pagely.netdna-cdn.com/wp-content/uploads/2017/03/eigenvalue.png)

Eigenvalues of the covariance matrix.

The number of components was varied. Finally, I used ![N=35](http://5047-presscdn.pagely.netdna-cdn.com/wp-content/ql-cache/quicklatex.com-261fc2069b8ba73c519fdcab903d1a01_l3.png) principle components. This approach showed ![logloss \approx 0.01511](http://5047-presscdn.pagely.netdna-cdn.com/wp-content/ql-cache/quicklatex.com-aa7d5a311fa216158876eb8605ffbc0b_l3.png).

##### Moments and hull

In order to generate even more features, I used OpenCV. There is a great [tutorial][3] on how to get the moments and hull of the image. I also added some pairwise multiplication of several features.

The final set of features is the following:

* Initial features
* height, width, ratio etc.
* PCA
* Moments

The Logistic Regression demonstrated ![logloss \approx 0.00686](http://5047-presscdn.pagely.netdna-cdn.com/wp-content/ql-cache/quicklatex.com-8907b26b5b74d22ec5a11029a42e0b75_l3.png). 

## The main idea

All of the above-described demonstrated good result. Such result would be appropriate for real life application. However, it could be enhanced. 

### Uncertainty

The majority of objects had certain decision: there was the only class with ![p \sim 1.0](http://5047-presscdn.pagely.netdna-cdn.com/wp-content/ql-cache/quicklatex.com-89f89745869578e0af285ce749943e8b_l3.png) and the rest had ![p \lesssim 0.01](http://5047-presscdn.pagely.netdna-cdn.com/wp-content/ql-cache/quicklatex.com-2c2328c894cfdead815445b146867dc7_l3.png). However, I found several objects with uncertainty in a prediction like this:

![Prediction of logistic regression.](http://5047-presscdn.pagely.netdna-cdn.com/wp-content/uploads/2017/03/uncertain_case.png)

Prediction of logistic regression.

The set of confusion classes was small (15 classes divided into several subgroups), so I decided to look at the pictures of the leaves and check if I can classify them. Here is the result:

![Quercus confusion group.](http://5047-presscdn.pagely.netdna-cdn.com/wp-content/uploads/2017/03/68_86-1024x175.png)

Quercus confusion group.

![Eucalyptus and Cornus confusion group.](http://5047-presscdn.pagely.netdna-cdn.com/wp-content/uploads/2017/03/22_24_29-1024x258.png)

Eucalyptus and Cornus confusion group.

I must admit that _Quercus'_ (Oak) leaves look almost the same for different subspecies. I assume, that I could distinguish _Eucalyptus_ from _Cornus_, but the classification of subspecies seems complicated to me. 

### Can you really see the random forest for the leaves?

The key idea of my solution was to create another classifier, which will make predictions only for confusion classes. The first one I tried was `RandomForestClassifier` from `sklearn` and it gave excellent result after the tuning of hyperparameters. The random forest was trained on the same data as logistic regression, but only the objects from confusion classes were used.

If logistic regression gave uncertain predictions for an object then the prediction of the random forest classifier was used. Random forest gave the probabilities for 15 classes, the rest assumed to be absolute ![0](http://5047-presscdn.pagely.netdna-cdn.com/wp-content/ql-cache/quicklatex.com-a5e437be25f29374d30f66cd46adf81c_l3.png).

The final pipeline is the following:

![Final pipeline.](http://5047-presscdn.pagely.netdna-cdn.com/wp-content/uploads/2017/03/pipeline.png)

Final pipeline.

### Threshold

The leaderboard score was calculated on the whole dataset. That is why some risky approaches could be used in this competition. 

Submissions are evaluated using the multi-class logloss.   
![ logloss = - \frac{1}{N} \sum_{i=1}^{N} \sum_{j=1}^{M} y_{ij}\log(p_{ij}) ](http://5047-presscdn.pagely.netdna-cdn.com/wp-content/ql-cache/quicklatex.com-564d0c00e415ca44e695054a639f9cec_l3.png)   
where ![N,M](http://5047-presscdn.pagely.netdna-cdn.com/wp-content/ql-cache/quicklatex.com-d68c5b0ddbc60bc448bed3d25c5972f9_l3.png) - number of objects and classes respectively, ![p_{ij}](http://5047-presscdn.pagely.netdna-cdn.com/wp-content/ql-cache/quicklatex.com-9a879e3960c7780dea4abfa24adbfaf7_l3.png) is the prediction and ![y_{ij}](http://5047-presscdn.pagely.netdna-cdn.com/wp-content/ql-cache/quicklatex.com-6e107980b6bfcd4767c99816ff4fefb9_l3.png) is the indicator: ![y_{ij} = 1](http://5047-presscdn.pagely.netdna-cdn.com/wp-content/ql-cache/quicklatex.com-4f66bc99744e8a90087b151765a0a8f0_l3.png) if object ![i](http://5047-presscdn.pagely.netdna-cdn.com/wp-content/ql-cache/quicklatex.com-695d9d59bd04859c6c99e7feb11daab6_l3.png) is in class ![j](http://5047-presscdn.pagely.netdna-cdn.com/wp-content/ql-cache/quicklatex.com-43c82d5bb00a7568d935a12e3bd969dd_l3.png), otherwise it equals to ![0](http://5047-presscdn.pagely.netdna-cdn.com/wp-content/ql-cache/quicklatex.com-a5e437be25f29374d30f66cd46adf81c_l3.png). If the model correctly chose the class, then the following approach will decrease the overall logloss, otherwise, it will increase dramatically. 

After thresholding, I got the score of ![logloss = 0.0](http://5047-presscdn.pagely.netdna-cdn.com/wp-content/ql-cache/quicklatex.com-d760ca60b23b4c099d7559f8f50d77c8_l3.png). That's it. All the labels are correct.

## What else?

I've tried several methods that showed appropriate result but was not used in the final pipeline. Moreover, I had some ideas on how to make the solution more elegant. In this section, I'll try to discuss them.

#### XGBoost

[XGBoost][4] by **dmlc** is a great tool. I've used it in several competitions before and decided to train it on the initially extracted features. It demonstrated the same score as logistic regression or even worse, but the time consumption was a way bigger.

#### Submission blending

Before I came up with an idea of Random Forest as the second classifier, I tried different one-model methods. Therefore I collected lots of submissions. The trivial idea is to blend the submissions: to use the mean of the predictions or weighted mean. The result did not impress me either. 

#### Neural networks

Neural networks were one of the first ideas I tried to implement. Convolutional Neural Networks are good feature extractors, therefore, they could be used as a first-level model or even as a main classifier. The original images came with different resolution. I rescaled them to ![50 \times 50](http://5047-presscdn.pagely.netdna-cdn.com/wp-content/ql-cache/quicklatex.com-8a59d9d406b9557318f6800d0f57e32b_l3.png). The training of CNN on my laptop was too time-consuming to choose the right architecture in reasonable time, so I declined this idea after several hours of training. I believe, that CNNs could give accurate predictions for this dataset. 

![](http://5047-presscdn.pagely.netdna-cdn.com/wp-content/uploads/2016/10/section-divider.png)

## Bio

[![](http://5047-presscdn.pagely.netdna-cdn.com/wp-content/uploads/2017/03/ivan-150x150.jpg)][1]

I am [Ivan Sosnovik][5]. I am a second-year master student at Skoltech and MIPT. Deep learning and applied mathematics are of great interest to me. You can visit my [GitHub][6] to check some stunning projects.\>\>\>

[0]: https://www.kaggle.com/c/leaf-classification
[1]: https://www.kaggle.com/isosnovik
[2]: https://www.kaggle.com/c/whats-cooking
[3]: http://docs.opencv.org/3.1.0/dd/d49/tutorial_py_contour_features.html
[4]: https://github.com/dmlc/xgboost
[5]: https://www.linkedin.com/in/ivan-sosnovik
[6]: https://github.com/ISosnovik...
  
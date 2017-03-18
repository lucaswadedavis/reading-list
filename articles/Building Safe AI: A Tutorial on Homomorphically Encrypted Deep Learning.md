# [Building Safe AI: A Tutorial on Homomorphically Encrypted Deep Learning](https://iamtrask.github.io/2017/03/17/safe-ai/)

    **TLDR:** In this blogpost, we're going to train a neural network that is fully encrypted during training (trained on unencrypted data). The result will be a neural network with two beneficial properties. First, the neural network's intelligence is protected from those who might want to steal it, allowing valuable AIs to be trained in insecure environments without risking theft of their intelligence. Secondly, the network can _only make encrypted predictions_ (which presumably have no impact on the outside world because the outside world cannot understand the predictions without a secret key). This creates a valuable power imbalance between a user and a superintelligence. If the AI is homomorphically encrypted, then from it's perspective, _the entire outside world is also homomorphically encrypted_. A human controls the secret key and has the option to either unlock the AI itself (releasing it on the world) or just individual predictions the AI makes (seems safer).

## Superintelligence

Many people are concerned that superpoweful AI will one day choose to harm humanity. Most recently, Stephen Hawking called for a [new world government][0] to govern the abilities that we give to Artificial Intelligence so that it doesn't turn to destroy us. These are pretty bold statements, and I think they reflect the general concern shared between both the scientific community and the world at large. In this blogpost, I'd like to give a tutorial on a potential technical solution to this problem with some toy-ish example code to demonstrate the approach.

The goal is simple. We want to build A.I. technology that can become incredibly smart (smart enough to cure cancer, end world hunger, etc.), but whose intelligence is controlled by a human with a key, such that the application of intelligence is limited. Unlimited learning is great, but unlimited application of that knowledge is potentially dangerous.

To introduce this idea, I'll quickly describe two very exciting fields of research: Deep Learning and Homomorphic Encryption.

---

---

## Part 1: What is Deep Learning?

Deep Learning is a suite of tools for the automation of intelligence, primarily leveraging neural networks. As a field of computer science, it is largely responsible for the recent boom in A.I. technology as it has surpassed previous quality records for many intelligence tasks. For context, it played a big part in [DeepMind's AlphaGo][1] system that recently defeated the world champion Go player, Lee Sedol.

**Question:** How does a neural network learn?

A neural network makes predictions based on input. It learns to do this effectively by trial and error. It begins by making a prediction (which is largely random at first), and then receives an "error signal" indiciating that it predicted too high or too low (usually probabilities). After this cycle repeates many millions of times, the network starts figuring things out. For more detail on how this works, see [A Neural Network in 11 Lines of Python][2]

The big takeaway here is this error signal. Without being told how well it's predictions are, it cannot learn. This will be important to remember.

## Part 2: What is Homomorphic Encryption?

As the name suggests, [Homomorphic Encryption][3] is a form of encryption. In the asymmetric case, it can take perfectly readable text and turn it into jibberish using a "public key". More importantly, it can then take that jibberish and turn it back into the same text using a "secret key". However, unless you have the "secret key", you cannot decode the jibberish (in theory). 

Homomorphic Encryption is a special type of encryption though. It allows someone to _modify_ the encrypted information in specific ways _without being able to read the information_. For example, homomorphic encryption can be performed on numbers such that multiplication and addition can be performed on encrypted values without decrypting them. Here are a few toy examples.

![](https://iamtrask.github.io/img/he.png)

Now, there are a growing number of homomorphic encryption schemes, each with different properties. It's a relatively young field and there are several significant problems still being worked through, but we'll come back to that later. 

For now, let's just start with the following. Integer public key encryption schemes that are homomorphic over multiplication and addition can perform the operations in the picture above. Furthermore, because the public key allows for "one way" encryption, you can even perform operations between unencrypted numbers and encrypted numbers (by one-way encrypting them), as exemplified above by 2 \* Cypher A. (Some encryption schemes don't even require that... but again... we'll come back to that later)

---

---

## Part 3: Can we use them together?

Perhaps the most frequent intersection between Deep Learning and Homomorphic Encryption has manifested around Data Privacy. As it turns out, when you homomorphically encrypt data, you can't read it but you still maintain most of the interesting statistical structure. This has allowed people to train models on encrypted data ([CryptoNets][4]). Furthermore a startup hedge fund called [Numer.ai][5] encrypts expensive, proprietary data and allows anyone to attmept to train machine learning models to predict the stock market. Normally they wouldn't be able to do this becuase it would constitute giving away incredibly expensive information. (and normal encryption would make model training impossible)

However, this blog post is about doing the inverse, encrypting the neural network and training it on decrypted data.

A neural network, in all its amazing complexity, actually breaks down into a surprisingly small number of moving parts which are simply repeated over and over again. In fact, many state-of-the-art neural networks can be created using only the following operations:

So, let's ask the obvious technical question, can we homomorphically encrypt the neural network itself? Would we want to? As it turns out, with a few conservative approximations, this can be done.

* Addition - works out of the box
* Multiplication - works out of the box
* Division - works out of the box? - simply 1 / multiplication 
* Subtraction - works out of the box? - simply negated addition
* [Sigmoid][6] - hmmm... perhaps a bit harder
* [Tanh][7] - hmmm... perhaps a bit harder
* [Exponential][8] - hmmm... perhaps a bit harder

It seems like we'll be able to get Division and Subtraction pretty trivially, but these more complicated functions are... well... more complicated than simple addition and multiplication. In order to try to homomorphically encrypt a deep neural network, we need one more secret ingredient.

---

---

## Part 4: Taylor Series Expansion

Perhaps you remember it from primary school. A [Taylor Series][9] allows one to compute a complicated (nonlinear) function using an _infinite_ series of additions, subtractions, multiplications, and divisions. This is perfect! (except for the infinite part). Fortunately, if you stop short of computing the exact Taylor Series Expansion you can still get a close approximation of the function at hand. Here are a few popular functions approximated via Taylor Series ([Source][10]).

![](https://iamtrask.github.io/img/taylor_series.gif)

WAIT! THERE ARE EXPONENTS! No worries. Exponents are just repeated multiplication, which we can do. For something to play with, here's a little python implementation approximating the Taylor Series for our desirable sigmoid function (the formula for which you can lookup on [Wolfram Alpha][6]). We'll take the first few parts of the series and see how close we get to the true sigmoid function.

With only the first four factors of the Taylor Series, we get very close to sigmoid for a relatively large series of numbers. Now that we have our general strategy, it's time to sepect a Homomorphic Encryption algorithm.

---

---

## Part 5: Choosing an Encryption Algorithm

Homomorphic Encryption is a relatively new field, with the major landmark being the discovery of the [first Fully Homomorphic algorithm][11] by Craig Gentry in 2009\. This landmark event created a foothold for many to follow. Most of the excitement around Homomorphic Encryption has been around developing Turing Complete, homomorphically encrypted computers. Thus, the quest for a fully homomorphic scheme seeks to find an algorithm that can efficiently and securely compute the various logic gates required to run arbitrary computation. The general hope is that people would be able to securely offload work to the cloud with no risk that the data being sent could be read by anyone other than the sender. It's a very cool idea, and a lot of progress has been made.

However, there are some drawbacks. In general, most _Fully Homomorphic Encryption_ schemes are incredibly slow relative to normal computers (not yet practical). This has sparked an interesting thread of research to limit the number of operations to be _Somewhat_ homomorphic so that at least some computations could be performed. Less flexible but faster, a common tradeoff in computation.

This is where we want to start looking. In theory, we want a homomorphic encryption scheme that operates on floats (but we'll settle for integers, as we'll see) instead of binary values. Binary values would work, but not only would it require the flexibility of Fully Homomorphic Encryption (costing performance), but we'd have to manage the logic between binary representations and the math operations we want to compute. A less powerful, tailored HE algorithm for floating point operations would be a better fit.

Despite this constraint, there is still a plethora of choices. Here are a few popular ones with characterics we like:

The best one to use here is likely either YASHE or FV. YASHE was the method used for the popular CryptoNets algorithm, with great support for floating point operations. However, it's pretty complex. For the purpose of making this blogpost easy and fun to play around with, we're going to go with the slightly less advanced (and possibly [less secure][12]) Efficient Integer Vector Homomorphic Encryption. However, I think it's important to note that new HE algorithms are being developed as you read this, and the ideas presented in this blogpost are generic to any schemes that are homomorphic over addition and multiplication of integers and/or floating point numbers. If anything, it is my hope to raise awareness for this application of HE such that more HE algos will be developed to optimize for Deep Learning.

This encryption algorithm is also covered extensively by Yu, Lai, and Paylor in [this work][13] with an accompanying implementation [here][14]. The main bulk of the approach is in the C file vhe.cpp. Below we'll walk through a python port of this code with accompanying explanation for what's going on. This will also be useful if you choose to implement a more advanced scheme as there are themes that are relatively universal (general function names, variable names, etc.).

---

---

## Part 6: Homomorphic Encryption in Python

Let's start by covering a bit of the Homomorphic Encryption jargon:

* **Plaintext:** this is your un-encrypted data. It's also called the "message". In our case, this will be a bunch of numbers representing our neural network.
* **Cyphertext:** this is your encrypted data. We'll do math operations on the cyphertext which will change the underlying Plaintext.
* **Public Key:** this is a pseudo-random sequence of numbers that allows anyone to encrypt data. It's ok to share this with people because (in theory) they can only use it for encryption. 
* **Private/Secret Key:** this is a pseudo-random sequence of numbers that allows you to decrypt data that was encrypted by the Public Key. You do NOT want to share this with people. Otherwise, they could decrypt your messages.

So, those are the major moving parts. They also correspond to particular variables with names that are pretty standard across different homomorphic encryption techniques. In this paper, they are the following:

* **S:** this is a matrix that represents your Secret/Private Key. You need it to decrypt stuff.
* **M:** This is your public key. You'll use it to encrypt stuff and perform math operations. Some algorithms don't require the public key for all math operations but this one uses it quite extensively.
* **c:** This vector is your encrypted data, your "cyphertext".
* **x:** This corresponds to your message, or your "plaintext". Some papers use the variable "m" instead.
* **_w_:** This is a single "weighting" scalar variable which we use to re-weight our input message x (make it consistently bigger or smaller). We use this variable to help tune the signal/noise ratio. Making the signal "bigger" makes it less susceptible to noise at any given operation. However, making it too big increases our likelihood of corrupting our data entirely. It's a balance.
* **E** or **e**: generally refers to random noise. In some cases, this refers to noise added to the data before encrypting it with the public key. This noise is generally what makes the decryption difficult. It's what allows two encryptions of the same message to be different, which is important to make the message hard to crack. Note, this can be a vector or a matrix depending on the algorithm and implementation. In other cases, this can refer to the noise that accumulates over operations. More on that later. 

As is convention with many math papers, capital letters correspond to matrices, lowercase letters correspond to vectors, and italic lowercase letters correspond to scalars.
Homomorphic Encryption has four kinds of operations that we care about: public/private keypair generation, one-way encryption, decryption, and the math operations. Let's start with decryption.
![](https://iamtrask.github.io/img/decryption2.png)
![](https://iamtrask.github.io/img/decryption.png)

The formula on the left describes the general relationship between our secret key S and our message x. The formula on the right shows how we can use our secret key to decrypt our message. Notice that "e" is gone? Basically, the general philosophy of Homomorphic Encryption techniques is to introduce just enough noise that the original message is hard to get back without the secret key, but a small enough amount of noise that it amounts to a rounding error when you DO have the secret key. The brackets on the top and bottom represent "round to the nearest integer". Other Homomorphic Encryption algorithms round to various amounts. Modulus operators are nearly ubiquitous.
Encryption, then, is about generating a c so that this relationship holds true. If S is a random matrix, then c will be hard to decrypt. The simpler, non-symmetric way of generating an encryption key is to just find the inverse of the secret key. Let's start there with some Python code.

    
    import numpy as np
    
    def generate_key(w,m,n):
        S = (np.random.rand(m,n) * w / (2 ** 16)) # proving max(S) 



[0]: https://futurism.com/stephen-hawking-finally-revealed-his-plan-for-preventing-an-ai-apocalypse/
[1]: https://deepmind.com/research/alphago/
[2]: https://iamtrask.github.io/2017/03/17/safe-ai/iamtrask.github.io/2015/07/12/basic-python-network/
[3]: https://www.wired.com/2014/11/hacker-lexicon-homomorphic-encryption/
[4]: https://arxiv.org/abs/1412.6181
[5]: https://medium.com/numerai/encrypted-data-for-efficient-markets-fffbe9743ba8
[6]: http://mathworld.wolfram.com/SigmoidFunction.html
[7]: http://mathworld.wolfram.com/HyperbolicTangent.html
[8]: https://en.wikipedia.org/wiki/Exponential_function
[9]: https://en.wikipedia.org/wiki/Taylor_series
[10]: http://hyperphysics.phy-astr.gsu.edu/hbase/tayser.html
[11]: https://www.cs.cmu.edu/~odonnell/hits09/gentry-homomorphic-encryption.pdf
[12]: https://eprint.iacr.org/2016/775.pdf
[13]: https://courses.csail.mit.edu/6.857/2015/files/yu-lai-payor.pdf
[14]: https://github.com/jamespayor/vector-homomorphic-encryption
  
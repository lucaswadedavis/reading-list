# [A Neural Network in 11 lines of Python (Part 1)](undefined)

    <<<

**Summary:** I learn best with toy code that I can play with. This tutorial teaches backpropagation via a very simple toy example, a short python implementation.

**Edit:** Some folks have asked about a followup article, and I'm planning to write one. I'll tweet it out when it's complete at [@iamtrask][0]. Feel free to follow if you'd be interested in reading it and thanks for all the feedback!

### Just Give Me The Code:

    
    X = np.array([ [0,0,1],[0,1,1],[1,0,1],[1,1,1] ])
    y = np.array([[0,1,1,0]]).T
    syn0 = 2*np.random.random((3,4)) - 1
    syn1 = 2*np.random.random((4,1)) - 1
    for j in xrange(60000):
        l1 = 1/(1 np.exp(-(np.dot(X,syn0))))
        l2 = 1/(1 np.exp(-(np.dot(l1,syn1))))
        l2_delta = (y - l2)*(l2*(1-l2))
        l1_delta = l2_delta.dot(syn1.T) * (l1 * (1-l1))
        syn1  = l1.T.dot(l2_delta)
        syn0  = X.T.dot(l1_delta)
    

**Other Languages: **[D][1]  

However, this is a bit terse.... let's break it apart into a few simple parts.

---

---

## Part 1: A Tiny Toy Network

A neural network trained with backpropagation is attempting to use input to predict output.
Inputs
Output

0
0
1
0

1
1
1
1

1
0
1
1

0
1
1
0

Consider trying to predict the output column given the three input columns. We could solve this problem by simply **measuring statistics** between the input values and the output values. If we did so, we would see that the leftmost input column is _perfectly correlated_ with the output. Backpropagation, in its simplest form, measures statistics like this to make a model. Let's jump right in and use it to do this.

### 2 Layer Neural Network:

    
    import numpy as np
    
    # sigmoid function
    def nonlin(x,deriv=False):
        if(deriv==True):
            return x*(1-x)
        return 1/(1 np.exp(-x))
        
    # input dataset
    X = np.array([  [0,0,1],
                    [0,1,1],
                    [1,0,1],
                    [1,1,1] ])
        
    # output dataset            
    y = np.array([[0,0,1,1]]).T
    
    # seed random numbers to make calculation
    # deterministic (just a good practice)
    np.random.seed(1)
    
    # initialize weights randomly with mean 0
    syn0 = 2*np.random.random((3,1)) - 1
    
    for iter in xrange(10000):
    
        # forward propagation
        l0 = X
        l1 = nonlin(np.dot(l0,syn0))
    
        # how much did we miss?
        l1_error = y - l1
    
        # multiply how much we missed by the 
        # slope of the sigmoid at the values in l1
        l1_delta = l1_error * nonlin(l1,True)
    
        # update weights
        syn0  = np.dot(l0.T,l1_delta)
    
    print 



[0]: https://twitter.com/iamtrask
[1]: https://github.com/Marenz/neural_net_examples...
  
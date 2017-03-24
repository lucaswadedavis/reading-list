# [Getting Started with React Navigation, the Navigation Solution for React Native](undefined)

    ---

![](https://cdn-images-1.medium.com/max/2000/1*rIMufUn7zaABj_VByGkhSA.jpeg)

# Getting Started with React Navigation, the Navigation Solution for React Native

If you've worked with React Native for any amount of time you've likely been confused by how you navigate in your app (practices, packages, etc). I've used React Native since the very early days of it being opened sourced and have tried many solutions, this has been my navigator progression...

NavigatorIOS \> Navigator \> react-native-router-flux \> NavigationExperimental or ex-navigation (depending on navigation requirements)

Each upgrade took time to refactor and introduce a new, slightly different, pattern for navigation and managing navigation state.

Fortunately, we've now got a single "official" solution to navigation in React Native with [react-navigation][0]. This solution will replace Navigator, NavigationExperimental, and ex-navigation becoming the new "official" navigation solution.

It's currently in beta but is in a pretty stable state. If you're starting a new React Native app I would say start with react-navigation, it will only get better from here.

Today, I want to take some time building an app with some common routing needs using react-navigation. We'll cover tabs, stacks, and modals --- this is just a very basic first look at the package. Here's the end product

![](https://cdn-images-1.medium.com/max/800/1*KmB469o2JwK3o21ncarimg.gif)

#### Code

All the code for this tutorial can be [found on Github][1]. I'll be starting with a simple app that has [react-native-elements][2], a few screens made, and some user data from [Random User Generator][3] so that we can focus on the navigation rather than configuring the app.

#### **Video**

Prefer to learn from video? Check out a video version of this tutorial on Youtube.

#### Tabs

The first thing we'll add is two tabs --- one for a list of users, and one for details of the current user. To accomplish this we'll use the [TabNavigator][4] from React Navigation.

We'll be working in the `config/router.js` file. The first thing we need to do is import our pre-built screens --- `Feed.js` and `Me.js` . We'll also need to import `TabNavigator` from `react-navigation` and `Icon` from `react-elements` .

With that completed we can actually start define our TabNavigator. The TabNavigator takes an object and each key/value pair is going to represent a tab.

You can see that we then pass a screen to each tab---this will be the component that should be rendered when that tab is active.

The last thing we need to do is use the Tabs navigator in our app entry point. The result of TabNavigator is simply a component and can be rendered like any other.

![](https://cdn-images-1.medium.com/max/800/1*YYdlKocB-p7MbDFA-NG-ZA.png)

However, we want to add an icon to the tab bar so things look right. There are two different ways to do it --- one is to define that information on the screen itself via the `navigationOptions` static or, and this is my preferred way, to define it at the same point you define the tabs.

![](https://cdn-images-1.medium.com/max/800/1*0vSiHXcy2WKQgYgAxXF0Kg.png)

Tabs are very simple to set up when using TabNavigator and you're able to quickly update and modify them.

#### Navigation Stack

Now when pressing a row item you likely, and correctly, expect that we go to a new screen as a result. For this we'll use the [StackNavigator][5] where we add a new screen onto the stack.

The API is extremely similar to that of TabNavigator where it takes an object in which we define all the screens that should be available in that stack.

First, make sure you import StackNavigator from `react-navigation`. You'll then also want to `import UserDetail from '../screens/UserDetail';`. We then define the StackNavigation, just like we did for the TabNavigator. We can then replace the Feed screen definition in the TabNavigator with our new stack.

I didn't mention it before but in React Navigation, in addition to accepting components for the screen, it accepts other navigation stacks to display for a screen. That means that our _FeedStack_ will be nested within our _Tabs_.

![](https://cdn-images-1.medium.com/max/800/1*VtueqWFHiOkTa-oREtMLHA.png)

Though this works it doesn't look quite right, we want some sort of title for our navigation bar on the feed screen... Just like before we can leverage the `navigationOptions` to set it. Check out the docs on all that you're able to do here.

Now to actually navigate from our list item to the screen.

Whenever you define a screen that component will have access to `[navigation][6]` on `this.props` which you can use for a host of things. Here we'll just be using it for the `navigate` function. In the `Feed.js` we'll add the following to the `onLearnMore` function.

Without completely rehashing the docs, we're telling navigate which screen we want to go to (which aligns with the key in our StackNavigator) and the data we want to pass to the next screen. This leaves us with

![](https://cdn-images-1.medium.com/max/800/1*dtDSt4G7y-YsvWJwZLfZtA.gif)

Now you may be wondering how we're accessing the data being passed to the new screen. It, like the navigate function, is available on `this.props.navigation` --- specifically `this.props.navigation.state.params`. I'm pulling all the data to generate the `UserDetail.js` screen like this

#### Modal

The final thing I want to cover in this tutorial is how to create a modal with React Navigation. It's a common pattern but one that I've found surprisingly difficult/not very intuitive to implement in other react native routing solutions.

To accomplish a modal we'll be creating another StackNavigator, with one subtle difference. This "Root" navigator will have our TabNavigator inside of it as well as our settings screen. We'll also tell this StackNavigator to, rather than bring cards/screens in from right to left, to bring them from bottom to top. All those words looks like this in code (make sure to import the Settings screen if you haven't already).

You can see that this StackNavigator is exactly the same as the one we created before but we're leveraging two options in it to make the modal interface we desired. In addition to the `mode`, which I described above, we have `headerMode` which tells the StackNavigator to not display a navigation bar for this stack --- we'll let the children navigators do that.

To keep a consistent interface and to show that you can nest a StackNavigator in a StackNavigator we'll build one for the settings screen as well.

Finally, we'll want to tell the app entry point to use our new Root navigator instead of the Tabs.

All of this leaves us with the following

![](https://cdn-images-1.medium.com/max/800/1*KmB469o2JwK3o21ncarimg.gif)

Remember, all of this [code is available on Github][1] and I encourage you to check it out as well as the [react navigation docs][0].

---

This was simply a brief first look at React Navigation. If you want to see more tutorials on it please let me know by recommending this article and commenting on what you want to learn next!
> 
> If you're interested in React Native and learning what goes into building production quality apps with it [sign up for my email list][7].



[0]: https://reactnavigation.org/
[1]: https://github.com/spencercarli/getting-started-react-navigation
[2]: https://github.com/react-native-community/react-native-elements
[3]: https://randomuser.me/
[4]: https://reactnavigation.org/docs/navigators/tab
[5]: https://reactnavigation.org/docs/navigators/stack
[6]: https://reactnavigation.org/docs/navigators/navigation-prop
[7]: http://www.handlebarlabs.com/react-native-mailing/...
  
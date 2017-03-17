# [Introducing React Loadable](https://medium.com/@thejameskyle/react-loadable-2674c59de178)

    ---

# Introducing React Loadable

## Component-centric code splitting and loading in React

When you have a large enough application, a single large bundle with all of your code becomes a problem for startup time. You need to start breaking your app into separate bundles and load them dynamically when needed.

![](https://cdn-images-1.medium.com/max/1000/1*AGEEEeTDf-S8I4AALPhtAQ.png)A single giant bundle vs. multiple smaller bundles

How to split a single bundle into multiple is a well solved problem with tools like [Browserify][0] and [Webpack][1].

But now you need to find places in your application where you can decide to split off into another bundle and load it asynchronously. You also need a way to communicate in your app when something is loading.

#### Route-based splitting vs Component-based splitting

A common piece of advice you will see is to break your app into separate routes and load each one asynchronously. This seems to work well enough for most apps, clicking on a link and loading a new page is not a terrible experience.

But we can do better than that.

Using most routing tools for React, a route is simply a component. There's nothing particularly special about them. So what if we optimized around components instead of delegating that responsibility to routes? What would that buy us?

![](https://cdn-images-1.medium.com/max/1000/1*ODrHocx1NxGmuwXq6f57xw.png)Route vs. component centric code splitting

It turns out quite a lot. There are many more places than just routes where you can pretty easily split apart your app. Modals, tabs, and many more UI components hide content until the user has done something to reveal it.

Not to mention all the places where you can defer loading content until higher priority content is finished loading. That component at the very bottom of your page which loads a bunch of libraries: Why does that need to be loaded at the same time as the content near the top?

You can still easily split on routes too since they are simply components. Just do whatever is best for your app.

But we need to make splitting up at the component-level as easy as splitting at the route-level. To split in a new place should be as easy as changing a few lines of app code and everything else is automatic.

---

### Introducing React Loadable

React Loadable is a small library I wrote after getting [fed up of you people saying this was hard to do][2].

Loadable is a higher-order component (a function that creates a component) which makes it easy to split up bundles on a component level.

Let's imagine two components, one that imports and renders another.



[0]: https://github.com/substack/factor-bundle
[1]: https://webpack.js.org/guides/code-splitting/
[2]: https://twitter.com/thejameskyle/status/839916840973299713
  
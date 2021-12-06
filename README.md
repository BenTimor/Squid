# Squid - Simple Stores For React

## About Squid (Not the one who swims at the ocean)

Squid is another store manager for React. But just like squids, which are weird but we still love them, Squid is different then most of the store/state managers for React.

It's unique because it's really simple (Influenced by Svelte stores), Requires almost zero setup and still optimized and powerful.

## Installation

    npm install react-squid

## How to use it? 

### Create store

Every class can be used as a store. Every static field inside a store can be used as its state. So, when you want to create a new store, You just have to create a class full of static fields inside. 

Lets say I have a counter application. Like those who you learn to develop in basic React tutorials. Its store is going to look something like this, probably:

	class ExampleStore {
	    static appName = "My Counter App";
	    static count = 1;
	}

###### Just a note - You can create more than one store. Use as much stores as you want!

And now, In order to actually make the store work, We need to pass it into the `store` function and export it.

	store(ExampleStore);
	export default ExampleStore;

That's it. Your store is ready and you can use it. See how easy it was? 

### How to use the store's data from a component?

So right now we only support function components because we use hooks for it. Or more specifically, we use **a hook** for it. Yes, only one hook.

All you have to do in order to start using the store is to call `useStore()`  once in your component. Doesn't matter how many stores and states you're going to use.

And what about using and updating the data? Just do it like you'd update and use every normal static field of class! 

For example, Our App component can be written like this:

	const App: React.FC = () => {
	  useStore();

	  return <>
	    <h1> { ExampleStore.appName } </h1>
	    <p onClick={() => ExampleStore.count += 1}> { ExampleStore.count } </p>
	  </>
	}

**And that's it. You can use Squid for your stores. And it only took like 2 lines of setup.**

## Advanced Usage

### State events

Sometimes you want to save your application data somewhere, Send it to your backend or retrieve it from localStorage. 

That's why Squid's `store` function has events that makes it all easier. They allow you to do something when the store is created, and do something when setting value to a field. 

Lets say we want to save every key of our store into the localStorage and load it every time the app is opened on the browser (Like a state which's saved also when refreshing the page). It's going to look something like this:

	function onLoad(key: string, _defaultValue: any /* This is the value we put directly into the field when created the store */) {
	    return localStorage.getItem(key) || undefined; // The value we're returning is going into the field. if it's undefined, We're gonna use the defaultValue automatically
	}

	function onSet(key: string, value: any) {
	    localStorage.setItem(key, `${value}`); // We're setting the value every time the state is changed
	}

	store(ExampleStore, onLoad, onSet);  

### Optimizing useStore hook

When you use `useStore();` without passing any parameters, You literally telling Squid that everytime you change something in one of your stores, It should reload the component.

But sometimes, Especially for big applications with big stores you'd like to refresh components only when their specific stores are changed. 

Luckily, `useStore();` can get an optional parameter with array of stores (and optionally keys) that tells it when it should reload the component.

For example, If we want to refresh the component only when ExampleStore1 or ExampleStore2 are changed, it's going to look like this:

	  useStore([
	    {
	      store: ExampleStore1,
	    },
	    {
	      store: ExampleStore2,
	    }
	  ]);

And if you want to refresh the component only when the fields "a" or "b" of ExampleStore1 is changed, or the field "c" of ExampleStore2 is changed, it's going to look like this:

	  useStore([
	    {
	      store: ExampleStore1,
	      keys: ["a", "b"]
	    },
	    {
	      store: ExampleStore2,
	      keys: ["c"]
	    }
	  ]);

It can get a little bit messy when there are a lot of stores, But you should be fine if you organize your stores and states in a nice way.


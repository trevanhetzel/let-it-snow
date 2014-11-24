let-it-snow
===========

### [View demo](http://trevanhetzel.github.io/let-it-snow)

This is a little experiment on creating CSS snowflakes that stick/collect to elements. The collection of snowflakes is not the most realistic it could be but, hey, the logic is there!

*Disclaimer*: the JavaScript is really just an experiment and I can't vouch for the performance of it. While it doesn't noticeably slow down a page, there's a little callback hell that could definitely be cleaned up. This is only my attempt at the getting the logic down :)

### Instantiation

```
$.letItSnow('.let-it-snow', {
    stickyFlakes: 'lis-flake--js',
    makeFlakes: true,
    sticky: true
});
```

### Usage

You can definitely use just the CSS for some nice snowflakes. To do so, you can either create a bunch (100 is what I use) of elements on your page with the class name `.lis-flake` (`<span class="lis-flake"></span>`) OR use the JavaScript plugin to create them for you by setting the `sticky` property to `false`.
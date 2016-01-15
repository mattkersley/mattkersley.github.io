---
layout: post
title:  One Dark Pygments Theme
date:   2016-01-14 22:39:00 +0000
categories: development
---

As part of the new Jekyll site build, I wanted to make sure I had a decent set of syntax highlighting colours for pygments to make use of (the framework that provides code highlighting on here).

I’ve recently switched my code editor over to [Atom.io](https://atom.io), and I like the default theme (One Dark), so I’ve basically ripped that off as much as possible.

It’s only really been tested with PHP, SCSS, HTML and JavaScript – let me know if you tweak it for other languages and I’d be happy to add it :)

Here’s the .scss for it below:

{% highlight scss linenos=table %}
/**
 * Syntax highlighting styles
 */
.highlight {
    background: #282C34;
    border-radius: .5em;
    color: #ddd;
    font-size: .5em;
    -webkit-font-smoothing: subpixel-antialiased;

    pre {
      font-family: Inconsolata, Monaco, Consolas, 'Courier New', Courier;
      margin: 0;
      overflow-x: scroll;
      white-space: pre;
    }

    .gutter pre {
      border-right: solid 1px #3C4049;
      margin-right:10px;
      padding:0 10px 0 5px;
      white-space: pre;
    }

    .highlighter-rouge & {
      background: #eef;
    }

    .c     { color: #5B6370; font-style: italic } // Comment
    .err   { color: #960050; background-color: #1e0010; } // Error
    .k     { color: #C776DF; font-weight: bold; } // Keyword
    .o     { font-weight: bold } // Operator
    .cm    { color: #5B6370; font-style: italic } // Comment.Multiline
    .cp    { color: #5B6370; font-weight: bold } // Comment.Preproc
    .c1    { color: #5B6370; font-style: italic } // Comment.Single
    .cs    { color: #5B6370; font-weight: bold; font-style: italic } // Comment.Special
    .gd    { color: #000; background-color: #fdd } // Generic.Deleted
    .gd .x { color: #000; background-color: #faa } // Generic.Deleted.Specific
    .ge    { font-style: italic } // Generic.Emph
    .gr    { color: #a00 } // Generic.Error
    .gh    { color: #5B6370 } // Generic.Heading
    .gi    { color: #a6e22e; background-color: #dfd } // Generic.Inserted
    .gi .x { color: #a6e22e; background-color: #afa } // Generic.Inserted.Specific
    .go    { color: #888 } // Generic.Output
    .gp    { color: #555 } // Generic.Prompt
    .gs    { font-weight: bold } // Generic.Strong
    .gu    { color: #aaa } // Generic.Subheading
    .gt    { color: #a00 } // Generic.Traceback
    .kc    { font-weight: bold } // Keyword.Constant
    .kd    { color: #C776DF; font-weight: bold } // Keyword.Declaration
    .kp    { font-weight: bold } // Keyword.Pseudo
    .kr    { font-weight: bold } // Keyword.Reserved
    .kt    { color: #458; font-weight: bold } // Keyword.Type
    .m     { color: #4FB6C3 } // Literal.Number
    .s     { color: #A2BD40 } // Literal.String
    .na    { color: #E2964A } // Name.Attribute
    .nb    { color: #4FB6C3 } // Name.Builtin
    .nc    { color: #E2964A; font-weight: bold } // Name.Class
    .nd    { color: #4FB6BE; } // Name.Decorator
    .no    { color: #4FB6BE } // Name.Constant
    .ni    { color: #E2964A } // Name.Entity
    .ne    { color: #900; font-weight: bold } // Name.Exception
    .nf    { color: #52A5EB; font-weight: bold } // Name.Function
    .nn    { color: #555 } // Name.Namespace
    .nt    { color: #DE5442 } // Name.Tag
    .nv    { color: #DE5442 } // Name.Variable
    .ow    { font-weight: bold } // Operator.Word
    .w     { color: #bbb } // Text.Whitespace
    .mf    { color: #4FB6C3 } // Literal.Number.Float
    .mh    { color: #4FB6C3 } // Literal.Number.Hex
    .mi    { color: #4FB6C3 } // Literal.Number.Integer
    .mo    { color: #4FB6C3 } // Literal.Number.Oct
    .sb    { color: #A2BD40 } // Literal.String.Backtick
    .sc    { color: #A2BD40 } // Literal.String.Char
    .sd    { color: #5B6370 } // Literal.String.Doc
    .s2    { color: #A2BD40 } // Literal.String.Double
    .se    { color: #A2BD40 } // Literal.String.Escape
    .sh    { color: #A2BD40 } // Literal.String.Heredoc
    .si    { color: #A2BD40 } // Literal.String.Interpol
    .sx    { color: #A2BD40 } // Literal.String.Other
    .sr    { color: #009926 } // Literal.String.Regex
    .s1    { color: #A2BD40 } // Literal.String.Single
    .ss    { color: #990073 } // Literal.String.Symbol
    .bp    { color: #999 } // Name.Builtin.Pseudo
    .vc    { color: #008080 } // Name.Variable.Class
    .vg    { color: #008080 } // Name.Variable.Global
    .vi    { color: #008080 } // Name.Variable.Instance
    .il    { color: #4FB6C3 } // Literal.Number.Integer.Long
}
{% endhighlight %}

<br>

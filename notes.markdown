---
layout: default
---

#Notes#

##"c"##

"c" can be a little confusing for me as it can refer to three things.

First, c can refer to the javascript controller, as in this line from a component:

{% highlight html %}
<aura:handler name="init" value="{!this}" action="{!c.doInit}"/>
{% endhighlight %}

Second, c can refer to the Apex controller, as in this line from a javascript controller element of a component:

{% highlight javascript %}
var action = component.get("c.getAccounts"); // name on the apex class
{% endhighlight %}

Third, c can also be the default namespace for lightning apps, components and events when you are creating them in an org where you chose to not create a namespace.

{% highlight html %}
<c:ContactList/>
{% endhighlight %}

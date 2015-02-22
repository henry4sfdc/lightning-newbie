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

##Refactoring Visualforce Controllers##

[Original Blog](http://reidcarlberg.com/2015/02/22/refactoring-visualforce-controllers-for-lightning-components/).

The following code won't compile. You'll get a handy <tt>Return type does not support AuraEnabled</tt> error because -- wait for it -- the @AuraEnabled annotation doesn't support PageReference return types.

{% highlight java %}
@AuraEnabled
public PageReference createMoTester1() {
    SmartFactory.FillAllFields = true;
    LAB_Mo_Tester_1__c t = (LAB_Mo_Tester_1__c) SmartFactory.createSObject('LAB_Mo_Tester_1__c');
    insert t;
	return new PageReference('/'+t.id);
}
{% endhighlight %}

You need to refactor your Visualforce controller to have two methods using this example.

{% highlight java %}
public PageReference createMoTester1() {
    Id myMo = getNewMoTester1Id();
    return new PageReference('/'+myMo);        
}    

@AuraEnabled
public Id getNewMoTester1Id() {
    SmartFactory.FillAllFields = true;
    LAB_Mo_Tester_1__c t = (LAB_Mo_Tester_1__c) SmartFactory.createSObject('LAB_Mo_Tester_1__c');
    insert t;  
    return t.id;                
}
{% endhighlight %}

Note that in this case, based on the way my test classes are structured, this didn't affect my code coverage.  It was 100% before, it's 100% after.
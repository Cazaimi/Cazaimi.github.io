---
layout: post
title: Tracking your productivity - API First
meta: "25th August, 2019. Reading time: 10 mins"
tags: [ExpressJs, NodeJs, Ultradian-Rhythm, Productivity]
---

![Productivity](/assets/images/posts/2-Ultradian-rhythm/productivity_laptop.jpg)

In a world full of feature requests, bi-weekly sprints and high iteration products, productivity is an important asset to have by your side. The idea is not to *spend more* time, but to *do more* in the time that you *end up* spending and this is where productivity ends up being important. But let's take a step back and define productivity first:

> **Productivity (n.)**: the rate at which a person, company, or country does useful work

However, like many aspects in our life, productivity too is cyclical, which means that an average person has both high and low periods of productivity throughout the day and that these periods occur roughly at the same times each day. This cyclical variation in productivity, with high and low periods is captured, among many other biological phenomena, by the Ultradian Rhythm. 

## 1. What is Ultradian rhythm?

Ultradian Rhythm measures other physiological phenomena in human beings apart from productivity, but we will not discuss them here. The core idea, however is that of physiological process being cyclical. You can know more about the Ultradian Rhythm [here](https://en.wikipedia.org/wiki/Ultradian_rhythm).

So if productivity is cyclical, and we cannot operate at peak productivity all the time, then the least we *can* do is leverage the periods of the cycle with high productivity to our benefit, by performing intellectually/will power stimulating tasks, and leave menial tasks to the low productivity periods. 

## 2. How do you map it?

I came across [this](https://evernote.com/blog/the-most-and-least-productive-hours-in-a-day/) blog post by Evernote, which suggested recording three variables, on a scale of 1-10 every *working* hour of the day:

- Focus
- Energy
- Enthusiasm

over a period of 30 days or more to get an idea of your mental state throughout the day. The post suggested that one make note of these variables, and offered an Evernote note template to manage the recording process (Fun fact, that's how I signed up on Evernote).

![Template offered by Evernote](/assets/images/posts/2-ultradian-rhythm/evernote-ultradian-rhythm-template.png)
<h5 class='image-subtext'>Ultradian Rhythm Template by Evernote</h5>

However, I find spreadsheet updation absolutely disconcerting 🙅‍♂️. Combine that with my itch to work on [MVC frameworks](https://en.wikipedia.org/wiki/Model–view–controller) other than [Sails.js](https://sailsjs.com/), and I decided that I will use a full fledged backend framework with a database to map this! The idea was to design an API which, by means of communication with the database, would store this productivity data. I could then create, read and manipulate the data using the API.

Hence, I decided to use:

1. [Express.js](http://expressjs.com/) as the framework for the app
2. [SQLite](https://www.sqlite.org/index.html) as the database
3. [Postman](https://www.getpostman.com) as the API development tool

Now, I know what you're thinking, "This is overkill", and you're absolutely right. It *is* overkill, but this exercise helped me:

1. Learn how Express.js works
2. Helped me track my productivity throughout the day
3. Allowed me to actually feel the difference API First makes

Besides, the whole thing took me ~7-8 hours to write, so win-win. 😇

Also, I happen to use Postman on a day to day basis (What good is your product if you, yourself don't use it 😉), and the data entry just became the simple task of:

1. Opening the app
2. Navigating to the collection 
3. Entering the numbers 
4. Sending a `HTTP POST` request

which, by the way I'd prefer over navigating to a boring spreadsheet and entering numbers (Maybe that's just me). 

*Note: Although many people typically use Express as a MVC framework, my particular needs did not require me to use the "View" part of the MVC.*

## 3. API First and General architecture

In my opinion, the "API fist design" paradigm is not stressed enough within the API industry, and I happen to be in support of the said paradigm.

One line definition:

> API First design can be described as defining your API *before* writing the first line of code. 

API First forces any group to think from the perspective of its consumers rather than their own. At the end of any API is a consumer, which may either be an internal team, that consumes your team's API or the business' customers themselves, who integrate the API in their own workflows. 

Any API is meant to make the life of the consumer simpler. Greater the simplicity, greater is the value that the consumer gets out of it. This, I believe is one of the true metrics that measures the value of an API. 

Of course, API First has other benefits such as documentation, automated testing, etc. You can learn more about API first design [here](https://www.programmableweb.com/api-university/understanding-api-first-design).

Therefore, before I even typed down my first `module.exports = {}`, I decided to design the API using Postman. I created a Postman Collection and began describing what the endpoints would look like. A Postman collection is essentially a group of requests (In this case, HTTP requests).

The structure of these endpoints would depend on the structure which I choose to represent the data. Hence, I needed to define the data before I designed my endpoints. I realized that I required just *one* data model: 

<pre>The data about a given hour on a given date</pre>

Ex: The focus, energy and enthusiasm I felt at 1900 hours on July 22nd, 2019. So, each row of the table `HourData` would contain:

1. HourDataId (Primary Key)
2. Date
3. Hour of the day
4. Focus
5. Energy
6. Enthusiasm

Designing the API then became simple: I required CRUD endpoints to read and modify this data, and the job would be done.

I proceeded to create these endpoints and described them in a Postman Collection:

![Postman collection](/assets/images/posts/2-ultradian-rhythm/postman-collection.png)
<h5 class='image-subtext'>Postman collection</h5>

This design helped me in the long run, as it gave me a clear picture of:

1. Exactly what this app would do
2. What were the functional boundaries between app components
3. What was to be the overall structure of the app

I say this again: 

> Had I not gone with "API First", the app development would have taken a longer time with me going back and forth between design and code to figure out "where should I put this?", "Should this code be a function of its own?", etc.

Since Postman automatically generates the collection documentation for you, I did not have to write any code on my website to display it. 

**You can find the API documentation [here](https://documenter.getpostman.com/view/4520909/S1LvWoaC)**

You can find the code's repository on Github with the link mentioned at the end.

## 4. Actual tracking

Since I used Git as the vcs for my code, after merging the code to `master` and tagging `v0.1.0`, I was ready to consume the API. 

![Postman collection](/assets/images/posts/2-ultradian-rhythm/postman-collection.png)

As mentioned before, all I'd need to do is enter the focus, energy, enthusiasm values and hit the `POST Input data` endpoint. The App would automatically pick up the date and time, and would store the data in the database. 

To remind myself about filling this every hour or so, I made a `crontab` trigger a bash script.

### Crontab

```
0 7-21 * * 1-5 bash ~/circadian.sh
```

“At minute 0 past every hour from 7 through 21 on every day-of-week from Monday through Friday.”

### Bash script

[circadian.sh](https://github.com/Cazaimi/circadian-api/blob/master/circadian.sh)

This script runs an [Apple script](https://developer.apple.com/library/archive/documentation/AppleScript/Conceptual/AppleScriptLangGuide/introduction/ASLR_intro.html) internally which sounds a chime and speaks a reminder.

[notif.scpt](https://github.com/Cazaimi/circadian-api/blob/master/notif.scpt)

## 5. Results and Inferences

I tracked this data for 50 days straight, by inputting the data as mentioned above. Post that, I used the `GET Retrieve all aggregates` endpoint to retrieve average data by the hour.

Some inferences:

- I am more productive towards the earlier parts of the day
- Energy tops at 9 am in the morning (Guess I am a morning lark 🌅)
- Energy is not at a high, post lunch 😳
- Enthusiasm peaks at about 4 pm
- I get absolutely knocked out after 8 pm 🥊

### 6. Conclusion

- Express is a light and flexible framework
- API first avoids re-design phases
- I should focus on intellectually taxing tasks in the morning and leave menial tasks towards the end of the day. 

If you too share my hate for spreadsheets and love APIs, check out the repo: [https://github.com/Cazaimi/circadian-api](https://github.com/Cazaimi/circadian-api)

Check out the awesome API development tool "Postman" at: [https://www.getpostman.com](https://www.getpostman.com/)

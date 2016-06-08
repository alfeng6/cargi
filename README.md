<!--# ![CS210](http://i.imgur.com/WdBU7U5.png (784b) ) | Cargi-->
<img src="http://i.imgur.com/Tyx3dLj.png" alt="cargi logo" width="300">
<!--<img src="http://i.imgur.com/jHcoBgU.png" alt="cargi logo" width="300">-->

Many tools in our lives are personalized, and we should expect the same things from our cars, considering the amount of time we spend in them. Drivers have varying skills and habits: some might prefer a safe driver mode which allows them to easily switch lanes, guides them into a parking spot, and finds roads where there are fewer cars.  Others might want the radio blasting and mood lighting as they speed down the highway, or want to automatically play their favorite morning radio show on their way to work. We’re really excited to make the car experience something that is more than just about getting from one place to another - the car should feel like an extension of yourself where everything is customized to perfectly meet your needs.


# Team Members
Member | Photograph
--- | ---
Maya Balakrishnan | <img src="http://i.imgur.com/2IXwdq9.jpg" alt="Maya Balakrishnan" width="105.3" height="157.5"> 
Tara Balakrishnan | <img src="http://i.imgur.com/VhFoQUj.jpg" alt="Tara Balakrishnan" width="105.3" height="133"> 
Edwin Park | <img src="http://i.imgur.com/TyXkgi0.jpg" alt="Edwin Park" width="204.8" height="136.5"> 
Ishita Prasad | <img src="http://i.imgur.com/hlSI4zx.jpg" alt="Ishita Prasad" width="204.8" height="136.5"> 
Kartik Sawhney | <img src="http://i.imgur.com/rpkFTgo.jpg" alt="Kartik Sawhney" width="106.9" height="137.1"> 
Emily Tang | <img src="http://i.imgur.com/BE2CmbR.jpg" alt="Emily Tang" width="204.8" height="153.6"> 



# Team Skills Matrix:

Member | Skills | Personal Traits | Desired Growth | Weaknesses | Hat
--- | --- | --- | --- | --- | ---
Maya | Web Applications, Mobile Development, Data collection and formatting, Writing, Communication  | Logical, creative, detail-oriented | Coordination of large-scale projects | Gets too caught up in small details | Green Hat
Tara | Statistical Data Mining, Machine Learning, NLP, HCI, Econometrics, Business/product Strategy | high-level thinker |  Mobile Development, Scalable Systems | Documentation | White Hat
Edwin | iOS Development, Data Mining, Machine Learning, AI, Computer Vision | Meticulous, disciplined | Management, collaboration, GitHub | Tends to procrastinate often | Blue Hat
Ishita | Design thinking, ethnography, user research, prototyping, visuals, web programming | Strategic, empathetic, very organized  | Product strategy, design, management, collaboration | Programming, AI, bad memory | Black Hat
Kartik | Machine learning, NLP, web apps, HCI, communication, writing | Logical, detail oriented, leadership qualities | Mobile development, AI | Front-end | Yellow Hat
Emily | Team/Product Management, Natural Language Processing, Computer Vision, AI, Machine Learning | Optimistic, hardworking, organized | Programming, HCI | Stubborn and opinionated | Yellow Hat







# Team Communication:
1. Slack: [cargi.slack.com](https://cargi.slack.com)
<br />
Join our Slack channel at [cargi.slack.com/signup](http://cargi.slack.com/signup).

2. [Google Drive](https://drive.google.com/folderview?id=0B9Jtns7w2L8rdUNzOF9tZWF4MjQ&usp=sharing)

3. [Google Calendar] (https://calendar.google.com/calendar/embed?src=stanford.edu_fa6rilc6g9ib2hka3tdv4asc9c%40group.calendar.google.com&ctz=America/Los_Angeles)

# Software Documentation Guide

## Problem Description

Cargi is a smart personal assistant for car that makes your driving experience pleasant, comfortable and intuitive. The app, by syncing with your calendar and contacts, makes texting, calling and navigation easier than before, and provides a user-centric interaction paradigm appropriate for the limited mobility and perception in a car. This documentation discusses the brainstorming and the design process, and provides a thorough discussion of our technical design. 

## Brainstorming

We began the design process with need-finding to understand the challenges that people faced while driving. As a part of this process, we conducted immersive interviews with several users about their experiences driving to/from work. Some of our major findings included patterns in user's activities in the car, difficulty in notifying ETAs, lack of a navigation app that accounted for real-time traffic, bad interface for calling/texting, challenges staying attentive and the need for information on cheap gas stations. This was followed by a phase of analogous research to explore the existing technologies and apps. Finally, we brainstormed several ideas for the features that would be most helpful for our customers. The picture below captures one of our brainstorming sessions. 

<img src="http://i.imgur.com/Gx6pQC0.jpg" alt="Cargi Brainstorming" width="1088" height="816"> 

## Design Rationale

To validate our value proposition, we prototype our idea using human Cargi, and also sent out a survey, asking people to rank a few features in order of importance to them. Based on the survey results, we realized navigation, communication, entertainment and information to be the most important to people. We followed this with Facebook advertisements to understand our target audience which was crucial for our design, and while young professionals were the most important target audience, the idea also resonated with older adults. To narrow our focus, however, we focused on young professionals that use a calendar to keep track of their engagements and use third party apps such as Spotify and Waze for entertainment and productivity respectively. 

Based on these observations, we decided on the following features for our first prototype. 

* The ability to text the ETA to the relevant contact as determined from the calendar event
* The ability to call the relevant contact
* Navigation to the relevant destination (determined from the calendar entry) using Google maps 
* The ability to launch Spotify from within the app with a single tap

Given the demand for ways to find cheap gas, we subsequently added a feature that finds the cheapest and nearest gas station, in addition to providing more options to the user in terms of third party apps and ETA message formats. Moreover, we added speech recognition and text-to-speech technologies to make the experience completely hands-free. Finally, to make Cargi even smarter, we used rule-based learning to resolve conflicts, such as contacts with the same name. The following sections discuss our technical framework and backend technologies. 

## Software functionality

The functionality of our project can be divided into the following heads. 

1. IOS app
  * Texting and calling
  * Identification of relevant contacts 
  * Navigation
  * Music
  * Cheapest gas
  * Continuous speech recognition and text-to-speech
2. Backend
  * Rule-based model for ranking contacts
  * Smart suggestion of contacts

### IOS app

All source code for our IOS app can be found in the CS210 cargi-ios repository on Github. 

#### Texting and calling

We use texting and calling features provided by MFMessageComposeViewController and tel://<number> URL. The relevant contact is identified from the calendar event entry, and the phone number is then retrieved from the user's contact. The texting feature sends the ETA of the user to the relevant contact, and provides multiple formats to allow the user to customize the message. 

#### Identification of relevant contacts

To identify relevant contacts from the calendar entry (event title), we use rules that are indicative of how contacts are usually specified in event title or notes. If the full name is present as a substring, then we identify the event contact without any further processing. Otherwise, we use rules such as the contact being composed of three words, the first name (and last name if available) not being stop words etc. In case these rules return multiple contacts, we use our backend APIs to rank them in decreasing order of event frequency (will be discussed later). These rules are successful in determining the correct relevant contact for the most part. In the future, we might want to integrate core NLP features such as NER to enhance its accuracy. 

#### Navigation

We use Google maps to navigate the user to the destination or the nearest gas station (if the gas feature is being used) by default. However, the user has the option of using Apple maps instead in the absence of Google maps, or by selecting Apple Maps from the settings. We determine the location from the event entry so that the user does not need to key in the destination. 

#### Music

Cargi opens the preferred app using deep learning. We currently support Spotify (default) and Apple music, and the user can select the preferred app from the settings. 

#### Cheapest and nearest gas stations

We developed an API located at https://gas-price-api.herokuapp.com/ that takes in a zip code, gets the corresponding city and state using the Ziptastic API, scrapes the MapQuest website for nearest and cheapest gas stations, and returns a JSON object with the nearest stations and the gas prices. Using this object, the relevant information is presented to the user, and Cargi can then navigate the user to the desired gas station using the navigation feature described above. 

#### Continuous speech recognition and TTS

We use RapidEars, a plug-in of a popular IOS speech recognition framework OpenEars, that helps with continuous offline speech recognition. We constantly listen for the phrase "Hey Carghi" (discrepancy in spelling due to better recognition accuracy), and use native IOS TTS (AVSpeechSynthesizer) to denote recognition. We then pass control to Nuance's speech recognition system to listen for more complex instructions. Note here that OpenEars has a very limited vocabulary, and Nuance does not support continuous speech recognition, necessitating the use of two speech recognition systems. 

### Backend

A crucial component of Cargi is the ability to process the data, and offer smart suggestions based on user’s activity and past preferences. We do so using rule-based models. This required us, however, to think about the most suitable backend platforms. After brainstorming and discussions, we finally settled in on Microsoft Azure. Our backend source code is available in the cargi-backend repo on Github. 

#### Rule-based model for ranking contacts

As discussed in the section on identification of relevant contacts above, it is possible that there are multiple relevant contacts for an event based on our rules. In these situations, we rank the contacts in the decreasing order of frequency of events with the current user. The filterContacts API helps do that. It takes the email address of the currently signed in user, and returns an array of contact names sorted in the correct order. 

#### Smart suggestion of contacts

The eventContacts API helps resolve the situation where one of the two users, say user1, involved in an event has user2 as an event contact, while user2 does not. The API, by traversing through events and event contacts of user1, can determine an event with user2, and recommend user1 as a contact for user2. Thus, this API helps predict event contacts where they cannot be determined otherwise. 

## Future extensions of the project

Some of the future extensions of this project include developing an Android app, making smarter suggestions based on analysis of past events (we already have a basic implementation of this feature in our backend repo), integrating with car, support for more third party apps, and integrating with reminders or similar apps to enhance user productivity.


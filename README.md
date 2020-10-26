# Petful Server
---

This API provides a list of cats or dogs up for adoption along with a list of people signed up to adopt. The lists are queues so the animals up for adoption the longest are seen first and hopefully adopted first. 

--- 

#### Endpoints

* /pets
  * get - enqueue pets
  * delete - dequeue pet
* /people 
  * get - enqueue adopters list
  * post - enqueue new adopter
  * delete - dequeue adopter

### Tech Stack 

* Express
* Node.js

---

## Live App and Repos

* [Hosted Live on Vercel](...)
* [Client Repo](https://github.com/lipcowan/DSA-Petful-Client)
* [Server Repo](https://github.com/lipcowan/DSA-Petful-Server)

### Brought to you by:

* Hannah Hart
* Phillip Cowan
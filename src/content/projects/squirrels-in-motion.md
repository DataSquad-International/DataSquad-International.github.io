---
title: "Squirrels in Motion"
description: "Motion-sensor collars on wild ground squirrels produced accelerometer data at 100 readings a second; the DSC helped turn it into a behavior-prediction model."
institutions: ["ucla"]
years: "2021"
tools: ["R"]
category: ["Data Science Center", "Machine Learning"]
heroImage: "/img/projects/squirrels-hero.jpg"
heroImageAlt: "A California ground squirrel wearing a motion-sensor collar"
sourceUrl: "https://ucla-datasquad.github.io/portfolio/09-squirrels/"
---

Amanda Robin, a PhD candidate in the Department of Ecology and Evolutionary Biology, studies the behavior and locomotion of wild squirrels. In 2019, she and the Squirrel Gazer team equipped wild California ground squirrels (*Otospermophilus beecheyi*) with motion-sensitive collars, recording accelerometer data at 100 values per second as the squirrels moved through their environment.

The team observed the squirrels directly and labeled their behavior (sitting, standing, laying down, and more) to pair with the motion data. Amanda wanted to use machine learning on that combination to better understand behavior patterns underground, somewhere direct observation can't reach. The Data Science Center is helping her use R and R packages to analyze the data and develop neural networks that predict a squirrel's activity from its motion signature.

The underground question is what makes this hard: casting the burrows, the way researchers study ant tunnels, wasn't possible because the tunnel networks were too extensive, and cameras couldn't capture measurements. Accelerometer and gyroscope collars, feeding into a machine learning model, are the path toward mapping the animals' 3D paths underground without ever seeing them.

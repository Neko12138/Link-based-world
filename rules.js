//filename: Game 1 Link-based world 

//pull test, push from pc2, pull from pc1
class Start extends Scene {
    create() {
        this.engine.setTitle(this.engine.storyData.Title); // done
        this.engine.addChoice("Wake up...");
    }

    handleChoice() {
        this.engine.gotoScene(Location, this.engine.storyData.InitialLocation); // done
    }
}

class Location extends Scene {
    create(key) {
        this.key = key;
        let locationData = this.engine.storyData.Locations[key]; //done
        this.engine.show(locationData.Body);// done
        
        if(locationData.Choices && locationData.Choices.length > 0) { //done
            for(let choice of locationData.Choices) { //done
                if (key === "Entrance" && choice.Text === "Open The Door") {
                    if (this.engine.storyData.houseKey !== 1) continue;
                }
                this.engine.addChoice(choice.Text, choice);// not really done, but work
            }
        } else {
            this.engine.addChoice("The end.")
        }
    }

    handleChoice(choice) {
        if(choice) {
            if (choice.Action === "jumpCouch") {
                if (this.engine.storyData.houseKey === 0) {
                    // first time
                    this.engine.show("The sofa is very springy and it bounces you up. And the key is also bounced up. Who put it there?");
                    this.engine.storyData.houseKey = 1; // houseKey 1
                } else if (this.engine.storyData.houseKey === 1) {
                    // second time
                    this.engine.show("You jump on it again and it bounces you back up. It's so much fun, but you still have to remember to go to class.");
                }
                this.create(this.key);
                return;
            }
            this.engine.show("&gt; "+choice.Text);
            this.engine.gotoScene(Location, choice.Target); //move to target
        } else {
            this.engine.gotoScene(End); //ending scene
        }
    }
}

class End extends Scene {
    create() {
        this.engine.show("<hr>");
        this.engine.show(this.engine.storyData.Credits);
    }
}

Engine.load(Start, 'myStory.json');
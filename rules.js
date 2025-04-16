//filename: Game 1 Link-based world 
class Start extends Scene {
    create() {
        this.engine.setTitle(this.engine.storyData.Title); // done
        this.engine.addChoice("Begin the story");
    }

    handleChoice() {
        this.engine.gotoScene(Location, this.engine.storyData.InitialLocation); // done
    }
}

class Location extends Scene {
    create(key) {
        let locationData = this.engine.storyData.Locations[key]; //done
        this.engine.show(locationData.Body);// done
        
        if(locationData.Choices && locationData.Choices.length > 0) { //done
            for(let choice of locationData.Choices) { //done
                this.engine.addChoice(choice.Text, choice);// not really done, but work
            }
        } else {
            this.engine.addChoice("The end.")
        }
    }

    handleChoice(choice) {
        if(choice) {
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
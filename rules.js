//filename: Game 1 Link-based world 

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
                if (choice.Door === 1 && this.engine.storyData.changeCloths !== 1) {
                    continue; // don't show the choice
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
                if (this.engine.storyData.jumpTimes === 0) {
                    // first time
                    this.engine.show(choice.SP_Text1);
                    this.engine.storyData.jumpTimes = 1; // houseKey 1
                } else if (this.engine.storyData.jumpTimes === 1) {
                    // second time
                    this.engine.show(choice.SP_Text2);
                }
                this.create(this.key);
                return;
            }
            if (choice.Key === 1) {
                this.engine.storyData.changeCloths = 1;
                if (choice.clothesText) {
                    this.engine.show(choice.clothesText);
                }
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
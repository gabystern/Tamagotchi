class Setting{

  constructor(settingObject){
    this.image = settingObject.image
  }

  render(){
    return `url(${this.image})`
  }

}

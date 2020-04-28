function Song(id ,name ,src ,imgUrl){
    this.id = id;
    this.name = name;
    this.src = src;
    this.imgUrl = imgUrl;
    this.selected = false;
}

var obj ={
    playList: [],
    addSong: function(id ,name ,src, imgUrl)
    {
        var song = new Song(id ,name ,src ,imgUrl);
        this.playList.push(song);
    },

    deletSong: function(id)
    {
        selectedSong = this.playList.filter(function(x) {
            return x.id == id;
        });
        // console.log(selectedSong);
        selectedSong[0].selected = !selectedSong[0].selected;

        this.playList = this.playList.filter(function(x) {
            return x.selected == false;
        })

    }
}
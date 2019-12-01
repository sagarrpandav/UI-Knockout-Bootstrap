var myObj;
var hot;
$(document).ready(function () {
    var divElement = document.getElementById("userStory1");

    var headers = HEADERS;
    /*
    function customRender(instance , td , row , col , prop , value , cellProperties) {
        var img = document.createElement("h3");
        img.innerText = value;

        Handsontable.dom.empty(td);
        td.appendChild(img);

        return td;
    };
    */
    /*
    function eventNameRender(instance , td , row , col , prop , value , cellProperties)
    {
        console.log(prop);
        console.log(value);
        var paragraph=document.createElement("p");
        var bold=document.createElement("b");
        paragraph.classList.add("text-info");
        bold.innerText=value;
        paragraph.appendChild(bold);

        td.appendChild(paragraph);

        return td;
    };
    */
    /*function viewIdeaButtonRenderer(instance , td , row , col , prop , value , cellProperties)
    {
        var button=document.createElement("button");
        button.classList.add("btn");
        button.classList.add("btn-info");
        button.addEventListener("click",myObj.goToViewIdea);
        button.innerText="View Ideass";

        td.appendChild(button);
    }*/

    /*
    var putCall = function(url, data, callback, type){

        /!*
        return $.ajax({
            url: url,
            type: 'PUT',
            success: callback,
            data: data,
            contentType: type
        });
        *!/
        return $.ajax({
            url: url,
            type: 'PUT',
            data: JSON.stringify(data),
            datatype: "application/json",
            contentType: "application/json",
            success: callback
        });
    };

    var postCall = function(url, data, callback, type){

        /!*
        return $.ajax({
            url: url,
            type: 'PUT',
            success: callback,
            data: data,
            contentType: type
        });
        *!/
        return $.ajax({
            url: url,
            type: 'POST',
            data: JSON.stringify(data),
            datatype: "application/json",
            contentType: "application/json",
            success: callback
        });
    };

    */

    function ViewModel() {
        var self = this;

        self.loggedIn = ko.observable(false);
        self.memberID = ko.observable(null);
        self.memberName=ko.observable();
        self.hackathons = ko.observableArray([]);
        self.showHackathons = ko.observable(true);
        self.ideas = ko.observableArray([]);
        self.selectedHackathon = ko.observable();
        self.addButtonContent = ko.observable("Add Hackathon");
        self.modalContent = ko.observable();

        self.selectedHackathonID = ko.observable();

        self.selectedIdeaID = ko.observable();
        self.selectedIdeaSummary = ko.observable();
        self.selectedIdeaDetails = ko.observable();
        self.selectedIdeaMembers = ko.observable();
        self.selectedIdeaCategory = ko.observable();
        self.selectedIdeaLikeCount = ko.observable();

        self.categoryList = ko.observableArray([]);

        self.filterIdeaCategory = ko.observable("All");
        self.newIdea = ko.observable(true);

        self.logIn = function () {
            getCall("http://localhost:8080/member/"+self.memberID(),{},function (response) {
                self.memberName(response.memberName);
                self.loggedIn(true);
                hot = new Handsontable(divElement, configForHandsOnTable);
                myObj.initLoad();
            });
        };

        self.filterIdeaCategory.subscribe(function () {
            if (!self.showHackathons()) {
                self.refresh();
            }
        });

        self.selectedIdeaMembers.subscribe(function () {
            console.log("Self.selectedMembers");
            console.log(self.selectedIdeaMembers);
        });

        self.refresh = function () {
            $.get("http://localhost:8080/hackathon/" + self.selectedHackathonID() + "/" + self.memberID() + "/ideas", {}, function (response) {

                console.log(response);
                self.ideas.removeAll();

                for (var i = 0; i < response.ideaDTOList.length; i++) {
                    self.ideas.push(response.ideaDTOList[i]);
                    //console.log(self.ideas());
                }
                var settingsForIdeas =
                    {
                        data: (self.filterIdeaCategory() === 'All') ? self.ideas() : _.filter(myObj.ideas(), function (obj) {
                            if (obj.categoryName === self.filterIdeaCategory()) {
                                return obj;
                            }
                        }),
                        colHeaders:
                            [
                                headers.IDEA_TABLE.IDEA_SUMMARY,
                                headers.IDEA_TABLE.IDEA_DETAILS,
                                headers.IDEA_TABLE.CATEGORY,
                                headers.IDEA_TABLE.MEMBERS,
                                headers.IDEA_TABLE.LIKES,
                                "",
                                ""
                            ],
                        columns:
                            [
                                {data: "ideaSummary", renderer: ideaBaseRenderer, readOnly: true},
                                {data: "ideaDetails", renderer: ideaBaseRenderer, readOnly: true},
                                {data: "categoryName", renderer: ideaBaseRenderer, readOnly: true},
                                {data: "teamMemberNames", renderer: ideaBaseRenderer, readOnly: true},
                                {data: "totalLikes", renderer: ideaBaseRenderer, readOnly: true},
                                {data: "liked", renderer: ideaBaseRenderer, readOnly: true},
                                {data: "editButton", renderer: ideaBaseRenderer, readOnly: true}
                            ],
                        colWidths: ["250%", "350%", "125%", "175%", "75%", "75%", "75%"],
                    };
                self.showHackathons(false);
                self.addButtonContent("Add Idea");
                self.selectedHackathon(response.hackathonName);
                hot.updateSettings(settingsForIdeas);
                hot.render();
            });


        };

        self.goToLike = function (arg) {
            // To Be Continued
            //object.classList.toggle("fa fa-thumbs-up");

            var seletedRow = hot.getSelected()[0][0];
            var selectedRowData = hot.getSourceDataAtRow(seletedRow);
            self.selectedIdeaID(selectedRowData.ideaID);


            putCall("http://localhost:8080/hackathons/ideas/" + self.selectedIdeaID() + "/like",
                {
                    "ideaID": self.selectedIdeaID(),
                    "memberID": self.memberID()
                }, function (response) {
                    if (response.status === "SUCCESS") {
                        self.refresh();
                        /*
                        $.get("http://localhost:8080/hackathon/"+self.selectedHackathonID()+"/ideas",{},function (response)
                        {
                            self.ideas.removeAll();
                            for(var i=0;i<response.ideaDTOList.length;i++)
                            {
                                self.ideas.push(convertIdeaObjToIdeaButton(response.ideaDTOList[i]));
                            }
                            var settingsForIdeas=
                                {
                                    data : myObj.ideas(),
                                    colHeaders :["Idea Summary","Idea Details","Domain","Members","Likes",""],
                                    dropdownMenu : true,
                                    columns :
                                        [
                                            {data : "ideaSummary" , readOnly : true},
                                            {data : "ideaDetails" , readOnly : true},
                                            {data : "categoryName" , readOnly : true},
                                            {data : "teamMemberNames" , readOnly : true},
                                            {data : "totalLikes" , readOnly : true},
                                            {data :"action" , renderer : "html" , readOnly : true},
                                            {data : "likeButton" , renderer : "html"}
                                        ]
                                };
                            self.showHackathons(false);
                            self.addButtonContent("Add Idea");
                            self.selectedHackathon(response.hackathonName);
                            hot.updateSettings(settingsForIdeas);
                            hot.render();
                        });
        */
                    }
                });
        };

        self.goToDislike = function () {
            var seletedRow = hot.getSelected()[0][0];
            var selectedRowData = hot.getSourceDataAtRow(seletedRow);
            self.selectedIdeaID(selectedRowData.ideaID);


            putCall("http://localhost:8080/hackathons/ideas/" + self.selectedIdeaID() + "/dislike",
                {
                    "likeID":selectedRowData.likeDTO.likeID,
                    "ideaID":selectedRowData.ideaID
                }, function (response) {
                    if (response.status === "SUCCESS") {
                        self.refresh();

                    }
                    ;
                });
        }

        self.addNew = function () {
            self.categoryList(_.without(self.categoryList(), "All"));
            self.newIdea(true);
            self.modalContent("Add Idea");
            self.selectedIdeaID(null);
            self.selectedIdeaMembers(null);
            self.selectedIdeaCategory(null);
            self.selectedIdeaDetails(null);
            self.selectedIdeaSummary(null);
            self.selectedIdeaLikeCount(null);

            $('#myModal').modal({backdrop: 'static', keyboard: false});
            $("#myModal").modal("show");
        };

        self.goToViewIdea = function () {
            var seletedRow = hot.getSelected()[0][0];
            var selectedRowData = hot.getSourceDataAtRow(seletedRow);

            self.selectedHackathonID(selectedRowData.id);

            $.get("http://localhost:8080/category", {}, function (response) {
                self.categoryList.removeAll();


                self.categoryList.unshift("All");
                console.log(response);
                for (var i = 0; i < response.length; i++) {
                    self.categoryList.push(response[i].categoryName);
                }
            });

            self.refresh();
            /*

                    $.get("http://localhost:8080/hackathon/"+self.selectedHackathonID()+"/ideas",{},function (response)
                    {
                        self.ideas.removeAll();
                        for(var i=0;i<response.ideaDTOList.length;i++)
                        {
                            self.ideas.push(convertIdeaObjToIdeaButton(response.ideaDTOList[i]));
                            console.log(self.ideas());
                        }
                        var settingsForIdeas=
                            {
                                data : myObj.ideas(),
                                colHeaders :["Idea Summary","Idea Details","Domain","Members","Likes",""],
                                dropdownMenu : true,
                                columns :
                                    [
                                        {data : "ideaSummary" , readOnly : true},
                                        {data : "ideaDetails" , readOnly : true},
                                        {data : "categoryName" , readOnly : true},
                                        {data : "teamMemberNames" , readOnly : true},
                                        {data : "totalLikes" , readOnly : true},
                                        {data :"action" , renderer : "html" , readOnly : true},
                                        {data : "likeButton" , renderer : "html" , readOnly  :true}
                                    ]
                            };
                        self.showHackathons(false);
                        self.addButtonContent("Add Idea");
                        self.selectedHackathon(response.hackathonName);
                        hot.updateSettings(settingsForIdeas);
                        hot.render();
                    });

                    $.get("http://localhost:8080/category",{},function (response)
                    {
                        for(var i=0;i<response.length;i++)
                        {
                            self.categoryList.push(response[i].categoryName);
                        }
                    });
            */
        };

        self.goToEditIdea = function () {
            self.categoryList(_.without(self.categoryList(), "All"));
            self.newIdea(false);
            self.modalContent("Edit Idea");

            var seletedRow = hot.getSelected()[0][0];
            var selectedRowData = hot.getSourceDataAtRow(seletedRow);

            self.selectedIdeaID(selectedRowData.ideaID);
            self.selectedIdeaCategory(selectedRowData.categoryName);
            self.selectedIdeaSummary(selectedRowData.ideaSummary);
            self.selectedIdeaDetails(selectedRowData.ideaDetails);
            self.selectedIdeaLikeCount(selectedRowData.totalLikes);
            self.selectedIdeaMembers(selectedRowData.teamMemberNames);

            $("#myModal").modal("show");
        };

        self.closeModal = function () {
            console.log("CLosing");
            self.categoryList.unshift("All");
            $("#myModal").modal("hide");
        };

        self.goToAddModifyIdea = function () {
            postCall();






            self.categoryList.push("All");
            self.categoryList(self.categoryList());
            if (self.newIdea()) {
                postCall("http://localhost:8080/hackathons/" + self.selectedHackathonID() + "/ideas",
                    {
                        "IdeaID": 0,
                        "ideaSummary": self.selectedIdeaSummary(),
                        "ideaDetails": self.selectedIdeaDetails(),
                        "categoryName": self.selectedIdeaCategory(),
                        "teamMemberNames": self.selectedIdeaMembers(),
                        "totalLikes": 0
                    }
                    , function (response) {
                        if (response.status === "SUCCESS") {
                            self.refresh();
                            /*
                            $.get("http://localhost:8080/hackathon/"+self.selectedHackathonID()+"/ideas",{},function (response)
                            {
                                self.ideas.removeAll();
                                for(var i=0;i<response.ideaDTOList.length;i++)
                                {
                                    self.ideas.push(convertIdeaObjToIdeaButton(response.ideaDTOList[i]));
                                }
                                var settingsForIdeas=
                                    {
                                        data : myObj.ideas(),
                                        colHeaders :["Idea Summary","Idea Details","Domain","Members","Likes",""],
                                        dropdownMenu : true,
                                        columns :
                                            [
                                                {data : "ideaSummary" , readOnly : true},
                                                {data : "ideaDetails" , readOnly : true},
                                                {data : "categoryName" , readOnly : true},
                                                {data : "teamMemberNames" , readOnly : true},
                                                {data : "totalLikes" , readOnly : true},
                                                {data :"action" , renderer : "html" , readOnly : true},
                                                {data : "likeButton" , renderer : "html"}
                                            ]
                                    };
                                self.showHackathons(false);
                                self.addButtonContent("Add Idea");
                                self.selectedHackathon(response.hackathonName);
                                hot.updateSettings(settingsForIdeas);
                                hot.render();
                            });*/
                        }
                    }
                    , "json");
            }
            else {
                putCall("http://localhost:8080/hackathons/ideas/" + self.selectedIdeaID(), {
                    "ideaID": self.selectedIdeaID(),
                    "ideaSummary": self.selectedIdeaSummary(),
                    "ideaDetails": self.selectedIdeaDetails(),
                    "categoryName": self.selectedIdeaCategory(),
                    "teamMemberNames": self.selectedIdeaMembers(),
                    "totalLikes": self.selectedIdeaLikeCount()
                }, function (response) {
                    if (response.status === "SUCCESS") {
                        self.refresh();
                        /*
                        $.get("http://localhost:8080/hackathon/"+self.selectedHackathonID()+"/ideas",{},function (response)
                        {
                            self.ideas.removeAll();
                            for(var i=0;i<response.ideaDTOList.length;i++)
                            {
                                self.ideas.push(convertIdeaObjToIdeaButton(response.ideaDTOList[i]));
                            }
                            var settingsForIdeas=
                                {
                                    data : myObj.ideas(),
                                    colHeaders :["Idea Summary","Idea Details","Domain","Members","Likes",""],
                                    dropdownMenu : true,
                                    columns :
                                        [
                                            {data : "ideaSummary" , readOnly : true},
                                            {data : "ideaDetails" , readOnly : true},
                                            {data : "categoryName" , readOnly : true},
                                            {data : "teamMemberNames" , readOnly : true},
                                            {data : "totalLikes" , readOnly : true},
                                            {data :"action" , renderer : "html" , readOnly : true},
                                            {data : "likeButton" , renderer : "html"}
                                        ]
                                };
                            self.showHackathons(false);
                            self.addButtonContent("Add Idea");
                            self.selectedHackathon(response.hackathonName);
                            hot.updateSettings(settingsForIdeas);
                            hot.render();
                        });
    */
                    }
                });

                self.newIdea(true);
                /*
                $.put("http://localhost:8080/hackathons/ideas/"+self.selectedIdeaID,
                    {
                    "IdeaID":self.selectedIdeaID ,
                    "ideaSummary":self.selectedIdeaSummary ,
                    "ideaDetails":self.selectedIdeaDetails ,
                    "categoryName":self.selectedIdeaCategory ,
                    "teamMemberNames":self.selectedIdeaMembers ,
                    "totalLikes":0
                    },function (response)
                    {
                        console.log(response);
                    }
                    );
                    */
            }
            self.categoryList.unshift("All");
        };

        self.initLoad = function () {
            /*$.get("http://localhost:8080/hackathons",{},function (response)
            {
                for(var i=0;i<response.length;i++)
                {
                    myObj.hackathons.push(response[i]);
                }

                hot.render();
            });*/
            getCall("http://localhost:8080/hackathons", {}, function (response) {
                for (var i = 0; i < response.length; i++) {
                    myObj.hackathons.push(response[i]);
                }

                hot.render();
            });
        };
    }

    myObj = new ViewModel();

    var configForHandsOnTable =
        {
            data: myObj.hackathons(),
            dataSchema: {eventName: null, moOffice: null, dateConducted: null, totalIdeas: null, action: null},
            colHeaders:
                [
                    headers.HACKATHON_TABLE.EVENT_NAME,
                    headers.HACKATHON_TABLE.MO_OFFICE,
                    headers.HACKATHON_TABLE.DATE,
                    headers.HACKATHON_TABLE.TOTAL_IDEAS,
                    ""
                ],
            columns:
                [
                    {data: "eventName", renderer: hackathonBaseRenderer, readOnly: true},
                    {data: "moOffice", renderer: hackathonBaseRenderer, readOnly: true},
                    {data: "dateConducted", renderer: hackathonBaseRenderer, readOnly: true},
                    {data: "totalIdeas", renderer: hackathonBaseRenderer, readOnly: true},
                    {data: "", renderer: hackathonBaseRenderer, readOnly: true}
                ],
            colWidths: ["200%", "200%", "150%", "100%", "200%"]
            /*afterSelection : function ()
            {
                console.log("AfterSelection Callback called ,args = "+arguments.length);
                for(var i=0;i<arguments.length;i++)
                {
                    console.log(arguments[i]);
                }

            }*/
        };

    /*
    var convertToButton=function(obj)
    {

        var newObj={};

        newObj.id=obj.id;
        newObj.eventName="<p class='text-info'><b>"+obj.eventName+"</b></p>";
        newObj.moOffice="<p class='text-info'>"+obj.moOffice+"</p>";
        newObj.dateConducted="<p class='text-info'>"+obj.dateConducted+"</p>";
        newObj.totalIdeas="<b><center><p class='text-info'>"+obj.totalIdeas+"</p></center></b>";
        newObj.action="<button class='btn btn-info' onclick='myObj.goToViewIdea()'>View Ideas</button>";

        return newObj;
    };
    */
    /*
    var convertIdeaObjToIdeaButton=function(obj)
    {
        var newObj={};

        newObj.ideaSummary=obj.ideaSummary;
        newObj.ideaDetails=obj.ideaDetails;
        newObj.categoryName=obj.categoryName;
        newObj.teamMemberNames=obj.teamMemberNames;
        newObj.totalLikes=obj.totalLikes;
        newObj.ideaID=obj.ideaID;
        newObj.action="<button class='btn btn-info' onclick='myObj.goToEditIdea()'>Edit Idea</button>";
        newObj.likeButton="<button class='btn' onclick='myObj.goToLike()'>Like Idea</button>";

        console.log("Inside trandofm");
        console.log(newObj.likeButton);

        return newObj;
    };
    */

    var initLoad = function () {
        /*$.get("http://localhost:8080/hackathons",{},function (response)
        {
            for(var i=0;i<response.length;i++)
            {
                myObj.hackathons.push(response[i]);
            }

            hot.render();
        });*/
        getCall("http://localhost:8080/hackathons", {}, function (response) {
            for (var i = 0; i < response.length; i++) {
                myObj.hackathons.push(response[i]);
            }
            hot.render();
        });
    };

    ko.applyBindings(myObj);
    /*hot = new Handsontable(divElement, configForHandsOnTable);*/
});
var Virgil = {
    setPageName: function setPageName() {
        var path = window.location.pathname;
        var page = path.split("/").pop();
        var PageName = page.split('.')[0].toLowerCase();
        return PageName;
    }
    , getListIndexByEntityTypeName: function getListIndexByEntityTypeName(EntityTypeName, Lists) {
        var ListIndex = -1;
        $(Lists).each(function myfunction(tmpListIndex, tmpList) {
            if (tmpList.hasOwnProperty('EntityTypeName') && tmpList.EntityTypeName === EntityTypeName) {
                ListIndex = tmpListIndex;
            }
        });
        return ListIndex;
    }
    , toHTMLTable: function toHTMLTable(JSArray) {
        var HTMLTable = '<!--HTMLTable-->';
        var getTHs = function getTHs(tmpRow) {
            var THs = '';
            for (var FieldName in tmpRow) {
                THs = THs + '<Th Data-Role="' + FieldName + '" VAlign = "Top">';
                THs = THs + FieldName;
                THs = THs + '</Th>';
            }
            return THs;
        }
        var getHead = function getHead(tmpRow) {
            var tHead = '';
            tHead = tHead + '<thead>';
            tHead = tHead + '<tr>';
            tHead = tHead + getTHs(tmpRow);
            tHead = tHead + '</tr>';
            tHead = tHead + '</thead>';
            return tHead;
        };
        var getBody = function getBody(JSArray) {
            var Body = '';
            Body = Body + '<TBody>';
            for (var RowIndex in JSArray) {
                var tmpRow = JSArray[RowIndex];
                Body = Body + '<Tr>';
                for (var FieldIndex in tmpRow) {
                    var tmpField = tmpRow[FieldIndex];
                    var DataType = typeof tmpField;
                    Body = Body + '<Td Data-Role = "' + FieldIndex + '" VAlign = "Top">';
                    switch (DataType) {
                        case 'object':
                            if (tmpField !== null) {
                                if (tmpField.hasOwnProperty('length')) {
                                    if (tmpField.length > 0) {
                                        Body = Body + Virgil.toHTMLTable(tmpField);
                                    }
                                } else {
                                    Body = Body + tmpField;
                                }
                            }

                            break;
                        default:
                            Body = Body + tmpField;
                    }

                    Body = Body + '</Td>';
                }
                Body = Body + '</Tr>';
            }
            Body = Body + '</TBody>';
            return Body;
        }

        if (JSArray.hasOwnProperty('length')) {
            if (JSArray.length > 0) {
                HTMLTable = HTMLTable + '<Table Class = "dataTable">';
                HTMLTable = HTMLTable + getHead(JSArray[0]);
                HTMLTable = HTMLTable + getBody(JSArray);
                HTMLTable = HTMLTable + '</Table>';
            }
        } else {
            HTMLTable = HTMLTable + '<Table Class = "dataTable">';

            for (var FieldName in JSArray) {
                var FieldValue = JSArray[FieldName]
                var DataType = typeof FieldValue;
                switch (DataType) {
                    case 'object':
                        if (FieldValue !== null) {
                            if (FieldValue.hasOwnProperty('length')) {
                                FieldValue = Virgil.toHTMLTable(FieldValue);
                            }
                        } else {
                            if (FieldValue.hasOwnProperty('length')) {

                            }
                        }

                        HTMLTable = HTMLTable + '<Tr>';
                        HTMLTable = HTMLTable + '<Th VAlign = "Top">';
                        HTMLTable = HTMLTable + FieldName;
                        HTMLTable = HTMLTable + '</Th>';
                        HTMLTable = HTMLTable + '<Td>';
                        HTMLTable = HTMLTable + FieldValue;
                        HTMLTable = HTMLTable + '</Td>';
                        HTMLTable = HTMLTable + '<Td>';
                        HTMLTable = HTMLTable + DataType;
                        HTMLTable = HTMLTable + '</Td>';
                        HTMLTable = HTMLTable + '</Tr>';
                        break;
                    default:
                        HTMLTable = HTMLTable + '<Tr>';
                        HTMLTable = HTMLTable + '<Th VAlign = "Top">';
                        HTMLTable = HTMLTable + FieldName;
                        HTMLTable = HTMLTable + '</Th>';
                        HTMLTable = HTMLTable + '<Td>';
                        HTMLTable = HTMLTable + FieldValue;
                        HTMLTable = HTMLTable + '</Td>';
                        HTMLTable = HTMLTable + '<Td>';
                        HTMLTable = HTMLTable + DataType;
                        HTMLTable = HTMLTable + '</Td>';
                        HTMLTable = HTMLTable + '</Tr>';
                }
            }

            HTMLTable = HTMLTable + '</Table>';
        }


        return HTMLTable;
    }
    , getParentDirectoryName: function getParentDirectoryName() {
        var myDir = $(location).prop("href").split("/").slice(0, -1);
        myDir = myDir[myDir.length - 1];
        myDir = myDir.toLocaleLowerCase();
        return myDir;
    }
    , getPayLoad: function getPayLoad(PayLoadType) {
        var PayLoad = {};
        switch (PayLoadType) {
            default:
                PayLoad.TargetSelect = 'TargetSelect';
                PayLoad.TemplateSelect = 'TemplateSelect';
                PayLoad.TemplateURL = 'TemplateURL';
                PayLoad.DataSet = [];
                PayLoad.TemplateLoaded = function TemplateLoaded() {

                };
        }
        return PayLoad;
    }
    , LoadTemplate: function LoadTemplate(PayLoad) {

        if (PayLoad.hasOwnProperty('TemplateURL')) {
            var TemplateURL = PayLoad.TemplateURL;
            var ApplyTemplate = function ApplyTemplate(TemplateHTML, textStatus, jqXhr) {

                if (PayLoad.hasOwnProperty('TemplateSelect')) {
                    var TemplateSelect = PayLoad.TemplateSelect;
                    if (PayLoad.hasOwnProperty('TargetSelect')) {
                        var TargetSelect = PayLoad.TargetSelect;
                        if (PayLoad.hasOwnProperty('DataSet')) {
                            var DataSet = PayLoad.DataSet;
                            try {
                                TemplateHTML = $(TemplateHTML).filter(TemplateSelect).html();
                                $(TargetSelect).html(Mustache.render(TemplateHTML, DataSet));
                                if (PayLoad.hasOwnProperty('TemplateLoaded')) {
                                    PayLoad.TemplateLoaded(PayLoad);
                                }
                            } catch (e) {
                                console.log('GLaDOS.Mustache.getSafe(59)');
                                console.error(e);
                                $(TargetElement).load(TemplateURL, complete);
                            }
                        }
                    }
                }


            };
            $.get(TemplateURL, ApplyTemplate);
        }




    }
    , getQueryString: function getQueryString(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"), results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }
    , ajax: function ajax(TableName, url, gotData) {
        $.ajax({
            url: url
            , method: "GET"
            , headers: { "Accept": "application/json; odata=verbose" }
            , success: function success(xhrData) {
                if (xhrData.hasOwnProperty('d')) {
                    xhrData = xhrData.d;
                    if (xhrData.hasOwnProperty('results')) {
                        xhrData = xhrData.results;
                        if (xhrData.length === 1) {
                            xhrData = xhrData[0];
                        }
                    }
                }
                Virgil[TableName] = xhrData;
                gotData(xhrData);
            }
            , error: function error(xhrData) {
                Virgil[TableName] = xhrData;
                gotData(xhrData);
            }
        });
    }
    , runLists: function runLists(Controller) {
        if (Controller.hasOwnProperty('Lists')) {
            var Lists = Controller.Lists;
            var runList = function runList(index, tmpList) {
                if (tmpList.hasOwnProperty('EntityTypeName')) {
                    var EntityTypeName = tmpList.EntityTypeName;
                    if (Controller.hasOwnProperty(EntityTypeName) && typeof Controller[EntityTypeName] === 'function') {
                        Controller[EntityTypeName](index, tmpList);
                    }
                }
            };
            $(Lists).each(runList);
        }
    }
    , AssignASRListItems: function AssignASRListItems() {
        if (Virgil.hasOwnProperty('objLists')) {
            var objLists = Virgil.objLists;
            if (objLists.hasOwnProperty('ASRList')) {
                var ASRList = objLists.ASRList;
                if (objLists.hasOwnProperty('ContractsList')) {
                    var ContractsList = objLists.ContractsList;
                    if (ASRList.hasOwnProperty('xhrData') && ContractsList.hasOwnProperty('xhrData')) {
                        var AssignASRListItem = function AssignASRListItem(index, tmpContractsListItem) {
                            if (tmpContractsListItem.hasOwnProperty('Id')) {
                                var ContractId = tmpContractsListItem.Id;
                                var TableName = 'ASRList' + ContractId;
                                var Filter = "$filter=Contract_x0020_Number eq " + ContractId;
                                var url = ASRList.getURI() + '?' + Filter;
                                var gotData = function gotData(xhrData) {
                                    var PrintASRListItems = function PrintASRListItems(ContractId, ASRListItems) {
                                        var DisplayHTML = '<!--Virgil.AssignASRListItems.AssignASRListItem.gotData.PrintASRListItems(117)-->';
                                        var PrintASRListItem = function PrintASRListItem(index, tmpASRListItem) {
                                            var OutHTML = '<!--PrintASRListItem-->';
                                            if (tmpASRListItem.hasOwnProperty('Id')) {
                                                OutHTML = OutHTML + '<Li>';
                                                OutHTML = OutHTML + '<A HRef = "/sites/J5/PMP-DEV/Lists/ASR/DispForm.aspx?ID=' + tmpASRListItem.Id + '">';
                                                if (tmpASRListItem.Comments != null) {
                                                    OutHTML = OutHTML + tmpASRListItem.Comments;
                                                } else {
                                                    OutHTML = OutHTML + tmpASRListItem.Title;
                                                }
                                                OutHTML = OutHTML + '</A>';
                                                OutHTML = OutHTML + '</Li>';
                                            }
                                            DisplayHTML = DisplayHTML + OutHTML;
                                        };
                                        $('*[data-role="ASRListItems"][data-contractid="' + ContractId + '"]').html('loading...');
                                        DisplayHTML = DisplayHTML + '<Ul>';
                                        $(ASRListItems).each(PrintASRListItem);
                                        DisplayHTML = DisplayHTML + '</Ul>';
                                        $('*[data-role="ASRListItems"][data-contractid="' + ContractId + '"]').html(DisplayHTML);
                                    };
                                    if (xhrData.hasOwnProperty('Id')) {
                                        xhrData = [xhrData];
                                    }
                                    tmpContractsListItem['ASRListItems'] = xhrData;
                                    PrintASRListItems(ContractId, xhrData);
                                }
                                Virgil.ajax(TableName, url, gotData);
                            }
                        };
                        $(ContractsList.xhrData).each(AssignASRListItem);
                    }
                }
            }
        }
    }
    , getLists: function getLists(apiURLPath, Controller) {
        var TableName = 'Lists';
        var url = apiURLPath + '/Lists';
        var gotData = function gotData(xhrLists) {
            var objLists = {};
            if (Controller.hasOwnProperty('CodeName')) {

                var ProcessList = function ProcessList(index, xhrListItem) {
                    xhrListItem['index'] = index;
                    if (xhrListItem.hasOwnProperty('EntityTypeName')) {
                        var EntityTypeName = xhrListItem.EntityTypeName;
                        if (xhrListItem.hasOwnProperty('Items')) {
                            var getURI = function getURI() {
                                return xhrListItem.Items.__deferred.uri;
                            };
                            xhrListItem['getURI'] = getURI;

                            objLists[EntityTypeName] = { getURI: getURI, xhrListItem: xhrListItem };
                        }
                    }
                };

                Virgil.DocumentReady = true;
                Controller.DocumentReady = true;

                $(xhrLists).each(ProcessList);
                Controller.PageName = Virgil.setPageName();
                Controller.Lists = xhrLists;
                Controller.objLists = objLists;
                Virgil.objLists = objLists;
                Virgil.RunPageMethod(Controller.PageName, Controller);
            }
        };
        Virgil.ajax(TableName, url, gotData);
    }
    , RunPageMethod: function RunPageMethod(PageName, Controller) {
        if (Controller.hasOwnProperty(PageName) && typeof Controller[PageName] === 'function') {
            Controller[PageName]();
        }
    }
    , DocumentReady: function DocumentReady(Controller) {
        if (Controller.hasOwnProperty('apiURLPath')) {
            var apiURLPath = Controller.apiURLPath;
            Controller.ParentDirectoryName = Virgil.getParentDirectoryName();
            Virgil.getLists(apiURLPath, Controller);
        } else {
            alert('Thou hast summoned Virgil without providing an apiURLPath.');
        }
    }
};

{
	"translatorID": "d92c6e9e-589b-401b-9342-d24ba6556568",
	"label": "OeStA",
	"creator": "Stephan Kurz",
	"target": "^https?://www.archivinformationssystem.at",
	"minVersion": "3.0",
	"maxVersion": "",
	"priority": 100,
	"inRepository": true,
	"translatorType": 4,
	"browserSupport": "gcsibv",
	"lastUpdated": "2020-09-22 14:27:12"
}

/**
	Copyright (c) 2020 Stephan Kurz
	
	This program is free software: you can redistribute it and/or
	modify it under the terms of the GNU Affero General Public License
	as published by the Free Software Foundation, either version 3 of
	the License, or (at your option) any later version.
	
	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
	Affero General Public License for more details.
	
	You should have received a copy of the GNU Affero General Public
	License along with this program. If not, see
	<http://www.gnu.org/licenses/>.
	https://www.archivinformationssystem.at/detail.aspx?ID=495489
	https://www.archivinformationssystem.at/detail.aspx?id=1159
	https://www.archivinformationssystem.at/detail.aspx?ID=3940521
	https://www.archivinformationssystem.at/resultatliste.aspx
*/

function detectWeb(doc, url) {
	/*if (url.search(detail.aspx) != -1) return "manuscript";
	else if (url.search(resultatliste.aspx) != -1) return "multiple";*/
	return "manuscript";
}

function scrape(doc, url) {
	var id = url.match(/detail\.aspx\?id=([0-9]+)/i)[1];
	var ArchivplanURL = "https://www.archivinformationssystem.at/archivplansuche.aspx?ID=" + id;
	/* var tags  = ZU.xpath(doc, '//span/a[@class="tagName"]'); */
	/* APPLICABLE 
	
	var numPages = "";
	var shortTitle = "";
	var date = "";
	var archive = "ÖStA";
	var archiveLocation = "";
	var callNumber = "";
	var extra = "";
	var abstractNote = "";
	*/
	
	var translator = Zotero.loadTranslator('web');
	// Embedded Metadata
	translator.setTranslator('951c027d-74ac-47d4-a107-9c3069ab7b48');
	translator.setDocument(doc);
	
	translator.setHandler('itemDone', function (obj, item) {
		item = new Zotero.Item("manuscript");
		item.title = ZU.xpathText(doc, '//td[contains(text(), "Titel:")]/following-sibling::td');
		item.abstractNote = "//td[@class='archivePlanContext']";
		item.manuscriptType ="archival";
		item.date = ZU.xpathText(doc, '//td[contains(text(), "Entstehungszeitraum:")]/following-sibling::td');
		item.reference = ZU.xpathText(doc, '//td[contains(text(), "Signatur:")]/following-sibling::td');
		item.archive = "ÖStA Österreichisches Staatsarchiv";
		item.archiveLocation = ZU.xpathText(doc, '//td[contains(text(), "Stufe:")]/following-sibling::td') + "\r\r" + ArchivplanURL;
		item.callNumber = ZU.xpathText(doc, '//td[contains(text(), "Signatur:")]/following-sibling::td');
		item.extra = ZU.xpathText(doc, '//td[contains(text(), "Unterteilung/Enthält:")]/following-sibling::td');
		item.numPages = ZU.xpathText(doc, '//td[contains(text(), "Umfang:")]/following-sibling::td');
		item.language = "";
		item.url = url;
		item.complete();
	});

}


function doWeb(doc, url) {
	if (detectWeb(doc, url) == "multiple") {
		pass;
	} else {
		scrape(doc, url);
	}
}
/** BEGIN TEST CASES **/
var testCases = []
/** END TEST CASES **/

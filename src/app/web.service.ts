import { Injectable } from '@angular/core';
import { Http,Headers,URLSearchParams, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Rx';
import {Response} from '@angular/http';
import  'rxjs/add/operator/map';

@Injectable()
export class WebService {

  private serviceUrl='http://localhost:48116/RecuruitmentService.asmx';

  constructor(private http:Http) { }


// getting Martial details 
saveAddress(){
  let paramData={name:"Mass"}
  return this.http.get(this.serviceUrl+'/addAddress',{params: paramData}).map(this.extractData);
}

private extractData(res: Response) {    
  return res.text() ? res.json() : {}; 
}

}

/**
 * Web Service code
 * --asmx file--
 *  [WebMethod]
        public void addAddress(string name)
        {
            try
            {
                Address ad = new Address();
                ad.name = name;
                em.Addresses.Add(ad);
                int res = em.SaveChanges();

                if (res > 0)
                {
                    int k = 2;
                    JavaScriptSerializer js = new JavaScriptSerializer();
                    Context.Response.Clear();
                    Context.Response.ContentType = "application/json";
                    Context.Response.Write(js.Serialize(k));
                    Debug.WriteLine("Address Data Sucessfully Inserted");

                }
                else
                {
                    Debug.WriteLine("Address Data Not Inserted");

                }
             
            }
            catch (Exception ex)
            {
                Debug.WriteLine("Add Address Error"+ex.Message);
            }
           
        }
 * 
 */

/**
 * Web Config code
 * <system.web>
    <compilation debug="true" targetFramework="4.5.2" />
    <httpRuntime targetFramework="4.5.2" />
    <webServices>
      <protocols>
        <add name="HttpGet"/>
        <add name="HttpPost"/>
      </protocols>
    </webServices>
  </system.web>
  
  -----------------------------------------------------
 <system.webServer>
    <httpProtocol>
      <customHeaders>
        <add name="Access-Control-Allow-Headers"  value="Origin, X-Requested-With, Content-Type, Accept,application/x-www-form-urlencoded" />
        <add name="Access-Control-Allow-Origin" value="http://localhost:4200"/>
        <add name="Access-Control-Allow-Methods" value="POST, GET, OPTIONS,PUT,DELETE" />
        <add name="Access-Control-Allow-Credentials" value="true" />
      </customHeaders>
    </httpProtocol>
  </system.webServer>

 * 
 */

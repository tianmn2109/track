using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Runtime.Serialization;
using System.Web.Script.Serialization;
using System.Collections;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Text;
using System.Threading.Tasks;
using System.Data.SqlClient;
namespace track.Controllers
{
    public class TrackController : Controller
    {
        // GET: Track


        public ActionResult Index()
        {
            return View();
        }
        public ActionResult IndexT()
        {
            return View();
        }
        public ActionResult New()
        {
            return View();
        }
        public ActionResult Waitting()
        {
            return View();
        }
        public ActionResult Dogfood()
        {
            return View();
        }
        public ActionResult Prod()
        {
            return View();
        }
        public ActionResult Exit_review()
        {
            return View();
        }
        public ActionResult resource()
        {
            return View();
        }
        public ActionResult stage()
        {
            return View();
        }
        public ActionResult other()
        {
            return View();
        }
        public ActionResult schedule()
        {
            return View();
        }
        public void refreshComming(object sender, EventArgs e)
        {
            string startDate = Request["startDate"].ToString();
            string endDate = Request["endDate"].ToString();
            Console.WriteLine(startDate + " -->  " + endDate);
        }
        public void refreshGoOut(object sender, EventArgs e)
        {
            string startDate = Request["startDate"].ToString();
            string endDate = Request["endDate"].ToString();
            Console.WriteLine(startDate + " -->  " + endDate);
        }
        public void updateStageSelected(object sender, EventArgs e)
        {
           // stageSelected = Request["stage"].ToString();
        }
        public ActionResult getJson()
        {
            var v = gjson();
            return Json(v, JsonRequestBehavior.AllowGet);
            //return View();
        }
        public List<FeatureStatus> refresh()
        {

            string coonString = @"SERVER=TFSOFFICEWH;UID=jipinshi;Trusted_Connection=Yes;APP=Microsoft Office 2013;WSID=Agile-Tracking";
            SqlConnection connection = new SqlConnection(coonString);
            connection.Open();
            // MessageBox.Show("Open database success!");
            string queryStr = @"SELECT CAST(CWIV.[TfsMigrationTool_ReflectedWorkItemId] as int) as 'ID' " +
                              @" ,CWIV.[System_Title] as 'Title' " +
                              @" ,CWIV.[Microsoft_VSTS_Scheduling_StartDate] as 'Start Date' " +
                              @" ,CWIV.[ASG_Release_DogfoodDate] as 'Dogfood Date' " +
                              @" ,DATEDIFF(WEEK, GETDATE(), CWIV.[ASG_Release_DogfoodDate]) as 'D_Wk' " +
                              @" ,CASE " +
                                  @" WHEN DATEDIFF(WEEK, GETDATE(), CWIV.[ASG_Release_DogfoodDate]) IS NULL THEN 'No Date' " +
                                  @" WHEN DATEDIFF(WEEK, GETDATE(), CWIV.[ASG_Release_DogfoodDate] ) >= 0 THEN 'Coming Soon' " +
                                  @" WHEN DATEDIFF(WEEK, GETDATE(), CWIV.[ASG_Release_DogfoodDate] ) < 0 THEN 'Live in Dogfood' " +
                              @" END as 'D_Soon' " +
                              @" , DATEDIFF(WEEK, CWIV.[ASG_Release_DogfoodDate], GETDATE() ) as 'Dog_past' " +
                              @" ,DATEDIFF(WEEK, CWIV.[ASG_Release_DogfoodDate], CWIV.[ASG_Release_ReleaseDate]) as 'Dog_len' " +
                              @" ,CWIV.[ASG_Release_ReleaseDate] as 'Release Date' " +
                              @",DATEDIFF(WEEK, GETDATE(), CWIV.[ASG_Release_ReleaseDate]) as 'R_Wk'" +
                              @" ,CASE " +
                                  @" WHEN DATEDIFF(WEEK, GETDATE(), CWIV.[ASG_Release_ReleaseDate]) IS NULL THEN 'No Date' " +
                                  @" WHEN DATEDIFF(WEEK, GETDATE(), CWIV.[ASG_Release_ReleaseDate] ) >= 0 THEN 'Coming Soon' " +
                                  @" WHEN DATEDIFF(WEEK, GETDATE(), CWIV.[ASG_Release_ReleaseDate] ) < 0 THEN 'Live in Prod' " +
                                  @" END as 'R_Soon' " +
                                  @", DATEDIFF(WEEK, CWIV.[ASG_Release_ReleaseDate], GETDATE() ) as 'Prod_past' " +
                                  @" ,DATEDIFF(WEEK, CWIV.[ASG_Release_ReleaseDate], CWIV.[Microsoft_VSTS_Scheduling_FinishDate]) as 'Prod_len' " +
                              @" ,CWIV.[Microsoft_VSTS_Scheduling_FinishDate] as 'Finish Date' " +
                              @" ,DATEDIFF(WEEK, GETDATE(), CWIV.[Microsoft_VSTS_Scheduling_FinishDate]) as 'F_Wk' " +
                              @" ,CASE " +
                                  @" WHEN DATEDIFF(WEEK, GETDATE(), CWIV.[Microsoft_VSTS_Scheduling_FinishDate]) IS NULL THEN 'No Date' " +
                                  @" WHEN DATEDIFF(WEEK, GETDATE(), CWIV.[Microsoft_VSTS_Scheduling_FinishDate] ) > 0 THEN 'Coming Soon' " +
                                  @" WHEN DATEDIFF(WEEK, GETDATE(), CWIV.[Microsoft_VSTS_Scheduling_FinishDate] ) = 0 THEN 'Exiting This Week' " +
                                  @" WHEN DATEDIFF(WEEK, GETDATE(), CWIV.[Microsoft_VSTS_Scheduling_FinishDate] ) < 0 THEN " +
                                  @" CASE" +
                                  @"     WHEN CWIV.[System_State] = 'Closed' THEN 'Closed' " +
                                  @"	ELSE 'Forgot to have Exit Review?' " +
                                  @"	END " +
                                  @" END as 'F_Soon' " +
                             @" ,CWIV.[System_AssignedTo] as 'Project Lead email' " +
                             @" ,CWIV.[Office_Common_PM] as 'PM email' " +
                             @" ,CWIV.[Office_Common_EM] as 'EM email' " +
                             @" ,CWIV.[Microsoft_VSTS_Planning_People] as 'People' " +
                             @" ,CWIV.[System_State] as 'State' " +
                             @" ,CWIV.[Office_Common_DevWeeks] as 'Dev Weeks' " +
                             @" ,CWIV.[System_CreatedDate] as 'Created Date' " +
                             @" ,CWIV.[Microsoft_VSTS_Common_ActivatedDate]	as 'Activated Date' " +
                             @" ,CWIV.[Microsoft_VSTS_Common_ClosedDate] as 'Closed Date' " +
                             @" ,CWIV.[AreaPath] as 'Area Path' " +
                             @" ,CWIV.[AreaName] as 'Area Name' " +
                             @" ,CWIV.[Microsoft_VSTS_Common_StackRank] as 'Stack Rank' " +
                             @" ,CWIV.[Office_Common_CurrentRingofValidation] " +
                             @" ,CWIV.[Office_Common_Category] " +
                             @" ,CWIV.[IterationName] " +
                             @" ,CWIV.[IterationPath] " +

                             @" FROM[Tfs_Warehouse].[dbo].[CurrentWorkItemView] as CWIV " +
                             @" WHERE " +
                                 @" CWIV.[System_WorkItemType] in ('Feature') " +
                                 @" and CWIV.[ProjectPath] = '\Office\Office Online'" +
                                 @" and CWIV.System_State in ('Active', 'Closed') " +
                                 @" ORDER BY CAST( CWIV.[TfsMigrationTool_ReflectedWorkItemId] as int ) ";

            SqlCommand selectCMD = new SqlCommand(queryStr, connection);

            SqlDataAdapter custDA = new SqlDataAdapter();
            custDA.SelectCommand = selectCMD;
            System.Console.WriteLine("1");
            DataSet custDS = new DataSet();
            custDA.Fill(custDS);
            List<FeatureStatus> list = new List<FeatureStatus>();
            foreach (DataRow mDr in custDS.Tables[0].Rows)
            {
                FeatureStatus feature = new FeatureStatus();
                //    foreach (DataColumn mDc in custDS.Tables[0].Columns)
                //   {
                //      if (mDr[mDc].ToString() == );

                //    Console.WriteLine("----------------");
                //}
                feature.featureName = mDr["Title"].ToString();

                if (mDr["State"].ToString() == "Closed")
                {
                    feature.featureStatus = "Done";
                    feature.featureStatusDescription = "Already finished.";
                    feature.weeksDisNextStatus = "";
                    feature.weeksInCurrentStatus = "";

                }
                else if (mDr["Dogfood Date"].ToString() == "")
                {
                    feature.featureStatus = "New";
                    feature.featureStatusDescription = "No Date";
                    feature.weeksInCurrentStatus = "No Date";
                    feature.weeksDisNextStatus = "No Date";
                }
                else if (mDr["F_Wk"].ToString() != "" && int.Parse(mDr["F_Wk"].ToString()) < 0)
                {
                    feature.featureStatus = "100% Done in Prod";
                    feature.featureStatusDescription = "Forgot to have Exit Review?";
                    feature.weeksInCurrentStatus = mDr["Prod_past"].ToString();
                    feature.weeksDisNextStatus = "0";
                }
                else if (mDr["R_Wk"].ToString() != "" && int.Parse(mDr["R_Wk"].ToString()) < 0)
                {
                    feature.featureStatus = "In Prod";
                    double complete = -1.0;
                    string process = "Unknown";
                    if (mDr["Prod_len"].ToString() != "")
                    {
                        complete = 100 * ((double)(int.Parse(mDr["Prod_past"].ToString())) / (double)(int.Parse(mDr["Prod_len"].ToString())));
                    }
                    if (complete != -1.0)
                    {
                        process = complete.ToString();
                        if (process.Length > 5)
                        {
                            process = process.Substring(0, 5);
                        }
                    }
                    feature.featureStatusDescription = "Completed " + process + "% Prod";
                    feature.weeksInCurrentStatus = mDr["Prod_past"].ToString();
                    if (mDr["F_Wk"].ToString() != "")
                        feature.weeksDisNextStatus = mDr["F_Wk"].ToString();
                    else
                        feature.weeksDisNextStatus = "Unknown";
                }
                else if (mDr["D_Wk"].ToString() != "" && int.Parse(mDr["D_Wk"].ToString()) < 0)
                {
                    feature.featureStatus = "In Dogfood";
                    double complete = -1.0;
                    string process = "Unknow";
                    if (mDr["Dog_len"].ToString() != "")
                    {
                        complete = 100 * ((double)(int.Parse(mDr["Dog_past"].ToString())) / (double)(int.Parse(mDr["Dog_len"].ToString())));
                    }
                    if (complete != -1.0)
                    {
                        process = complete.ToString();
                        if (process.Length > 5)
                        {
                            process = process.Substring(0, 5);
                        }
                    }
                    feature.featureStatusDescription = "Completed " + process + "% in Dogfood.";
                    feature.weeksInCurrentStatus = mDr["Dog_past"].ToString();
                    if (mDr["R_Wk"].ToString() != "")
                        feature.weeksDisNextStatus = mDr["R_Wk"].ToString();
                    else
                        feature.weeksDisNextStatus = "Unknown";
                }
                else
                {
                    feature.featureStatus = "In Waitting";
                    int week = int.Parse(mDr["D_Wk"].ToString());
                    feature.featureStatusDescription = "Comming soon to Dogfood in the next " + week.ToString() + " weeks";
                    feature.weeksInCurrentStatus = "No Date";
                    if (mDr["D_Wk"].ToString() != "")
                        feature.weeksDisNextStatus = mDr["D_Wk"].ToString();
                    else
                        feature.weeksDisNextStatus = "Unknown";
                }
                list.Add(feature);
            }
            System.Console.WriteLine("2");
            //   this.dataGridView1.DataSource = custDS.Tables[0];
            System.Console.WriteLine("3");
            connection.Close();
            return list;

            
            return list;
        }

        public List<Feature> getStatus(string stageSelected)
        {/*
            string coonString = @"SERVER=TFSOFFICEWH;UID=jipinshi;Trusted_Connection=Yes;APP=Microsoft Office 2013;WSID=Agile-Tracking";
            SqlConnection connection = new SqlConnection(coonString);
            connection.Open();
            // MessageBox.Show("Open database success!");
            string queryStr = @" SELECT " +
                              @" CWIV.[System_Title] as 'name' " +
                               @" ,CWIV.[System_CreatedDate] as 'New' " +
                              @" ,CWIV.[Microsoft_VSTS_Common_ActivatedDate] as 'Active' " +
                              @" ,CWIV.[ASG_Release_DogfoodDate] as 'Dogfood' " +
                              @" ,CWIV.[ASG_Release_ReleaseDate] as 'Prod' " +
                              @" ,CWIV.[Microsoft_VSTS_Scheduling_FinishDate] as 'Exit review' " +
                              @" ,CWIV.[Microsoft_VSTS_Common_ClosedDate] as 'Done' " +
                              @" ,CWIV.[System_State] as 'status' " +
                              @" ,CWIV.[AreaPath] as 'Area Path' " +
                              @" , CWIV.[Microsoft_VSTS_Common_Triage] as 'realstatus' " +
                              @" ,DATEDIFF( WEEK, GETDATE(), CWIV.[Microsoft_VSTS_Common_ActivatedDate] ) as 'A_Wk' " +
                              @" , DATEDIFF(WEEK, GETDATE(), CWIV.[ASG_Release_DogfoodDate] ) as 'D_Wk' " +
	                          @" ,DATEDIFF(WEEK, GETDATE(), CWIV.[ASG_Release_ReleaseDate]) as 'R_Wk' " +
	                          @" ,DATEDIFF(WEEK, GETDATE(), CWIV.[Microsoft_VSTS_Scheduling_FinishDate]) as 'F_Wk' " +
                              @" ,DATEDIFF( WEEK, GETDATE(), CWIV.[Microsoft_VSTS_Common_ClosedDate] ) as 'DONE_Wk' " +
                              @" ,DATEDIFF( WEEK, GETDATE(), CWIV.[System_CreatedDate] ) as 'New_Delay_Wk' " +
                              @" , DATEDIFF(WEEK, CWIV.[System_CreatedDate], CWIV.[Microsoft_VSTS_Common_ActivatedDate] ) as 'NtoA_Wk' " +
	                          @" ,DATEDIFF(WEEK, CWIV.[Microsoft_VSTS_Common_ActivatedDate], CWIV.[ASG_Release_DogfoodDate]) as 'AtoD_Wk' " +
	                          @" ,DATEDIFF(WEEK, CWIV.[ASG_Release_DogfoodDate], CWIV.[ASG_Release_ReleaseDate]) as 'DtoP_Wk' " +
	                          @" ,DATEDIFF(WEEK, CWIV.[ASG_Release_ReleaseDate], CWIV.[Microsoft_VSTS_Scheduling_FinishDate]) as 'PtoE_Wk' " +
	                          @" ,DATEDIFF(WEEK, CWIV.[Microsoft_VSTS_Scheduling_FinishDate], CWIV.[Microsoft_VSTS_Common_ClosedDate]) as 'EtoD_Wk' " +

                              @" FROM[Tfs_Warehouse].[dbo].[CurrentWorkItemView] as CWIV " +

                              @" WHERE " +

                              @" CWIV.[System_WorkItemType] in ('Feature') " +
                              @" and CWIV.[System_State] in ('New', 'Active', 'Closed') " +
                              @" and CWIV.[AreaName] = 'OAS' " +

                              @" ORDER BY CAST(CWIV.[TfsMigrationTool_ReflectedWorkItemId] as int ) ";

            SqlCommand selectCMD = new SqlCommand(queryStr, connection);

            SqlDataAdapter custDA = new SqlDataAdapter();
            custDA.SelectCommand = selectCMD;
            System.Console.WriteLine("1");
            DataSet custDS = new DataSet();
            custDA.Fill(custDS);
            List<Feature> list = new List<Feature>();
            foreach (DataRow mDr in custDS.Tables[0].Rows)
            {
                Feature feature = new Feature();
                //    foreach (DataColumn mDc in custDS.Tables[0].Columns)
                //   {
                //      if (mDr[mDc].ToString() == );

                //    Console.WriteLine("----------------");
                //}
               
                feature.date = new List<string>();
                // feature name
                feature.name = mDr["name"].ToString();

                // feature start date
                if (mDr["New"].ToString() == "")
                    feature.date.Add(" ");
                else
                    feature.date.Add(DateTime.Parse((mDr["New"].ToString())).ToShortDateString());

                if (mDr["Active"].ToString() == "")
                    feature.date.Add(" ");
                else
                    feature.date.Add(DateTime.Parse((mDr["Active"].ToString())).ToShortDateString());

                if (mDr["Dogfood"].ToString() == "")
                    feature.date.Add(" ");
                else
                    feature.date.Add(DateTime.Parse((mDr["Dogfood"].ToString())).ToShortDateString());

                if (mDr["Prod"].ToString() == "")
                    feature.date.Add(" ");
                else
                    feature.date.Add(DateTime.Parse((mDr["Prod"].ToString())).ToShortDateString());

                if (mDr["Exit review"].ToString() == "")
                    feature.date.Add(" ");
                else
                    feature.date.Add(DateTime.Parse((mDr["Exit review"].ToString())).ToShortDateString());

                if (mDr["Done"].ToString() == "")
                    feature.date.Add(" ");
                else
                    feature.date.Add(DateTime.Parse((mDr["Done"].ToString())).ToShortDateString());
                feature.weeks = "2";

                if (mDr["DONE_Wk"].ToString() != "")
                {
                    feature.status = "Exit review";
                    feature.weeks = mDr["DONE_Wk"].ToString();
                    if (int.Parse(mDr["DONE_Wk"].ToString()) < 0)
                    {
                        feature.delay = true;
                    }
                    else
                    {
                        feature.delay = false;
                    }
                    if (mDr["status"].ToString() == "Closed")
                    {
                     //   feature.status = "Done";
                    }

                }
                if (mDr["F_Wk"].ToString() != "")
                {
                   
                    if (int.Parse(mDr["F_Wk"].ToString()) < 0)
                    {
                        if (mDr["DONE_Wk"].ToString() == "")
                        {
                            feature.status = "Exit review";
                            feature.weeks = mDr["F_Wk"].ToString();
                            feature.delay = true;
                        }
                    }
                    else
                    {
                        feature.delay = false;
                        feature.status = "Prod";
                        feature.weeks = mDr["F_Wk"].ToString();
                    }

                }
                if (mDr["R_Wk"].ToString() != "")
                {
                    
                    
                    if (int.Parse(mDr["R_Wk"].ToString()) < 0)
                    {
              }
                    else
                    {
                        feature.delay = false;
                        feature.status = "Dogfood";
                        feature.weeks = mDr["R_Wk"].ToString();
                    }
                }
                if (mDr["D_Wk"].ToString() != "")
                {
                    
                    
                    if (int.Parse(mDr["D_Wk"].ToString()) < 0)
                    {
                   }
                    else
                    {
                        feature.delay = false;
                        feature.status = "Active";
                        feature.weeks = mDr["D_Wk"].ToString();
                    }
                }
                if (mDr["A_Wk"].ToString() != "")
                {
                    
                    
                    if (int.Parse(mDr["A_Wk"].ToString()) < 0)
                    {
                        if (mDr["D_Wk"].ToString() == "")
                        {
                            feature.status = "Active";
                            feature.weeks = mDr["A_Wk"].ToString();
                            feature.delay = true;
                        }
                    }
                    else
                    {
                        feature.delay = false;
                        feature.status = "New";
                        feature.weeks = mDr["A_Wk"].ToString();
                    }
                }
                else
                {
                    feature.status = "New";
                    feature.weeks = "";
                    feature.delay = false;
                }
                if (mDr["status"].ToString() == "Closed")
                {
                    feature.status = "Done";
                    feature.delay = false;
                }
                if (mDr["status"].ToString() == "New")
                {
                    feature.status = "New";
                    if (feature.delay == true)
                    {
                        feature.weeks = mDr["New_Delay_Wk"].ToString();
                    }
                }
                
                if (feature.weeks.ToString() != "" && int.Parse(feature.weeks) >= 0) {
                    feature.weeks = "+" + feature.weeks;
                }

                feature.newToActiveWeeks = mDr["NtoA_Wk"].ToString();
                feature.activeToDoogfoodWeeks = mDr["AtoD_Wk"].ToString();
                feature.dogfoodToProdWeeks = mDr["DtoP_Wk"].ToString();
                feature.prodToExitreviewWeeks = mDr["PtoE_Wk"].ToString();
                feature.exitreviewToDoneWeeks = mDr["EtoD_Wk"].ToString();
                // deal with negative sign
             //   if (feature.weeks != "" && int.Parse(feature.weeks) < 0)
             //       feature.weeks = feature.weeks.Substring(1);
                if (stageSelected == "All" || stageSelected == mDr["status"].ToString())
                {
                    list.Add(feature);
                }
            }
            System.Console.WriteLine("2");
            //   this.dataGridView1.DataSource = custDS.Tables[0];
            System.Console.WriteLine("3");
            connection.Close();
            return list;
            //     MessageBox.Show("Close database success !");
            //return View();

            */
            List<Feature> list = new List<Feature>();
            for (int i = 0; i < 100; i++)
            {
                Feature f1 = new Feature();
                f1.activeToDoogfoodWeeks = "2";

                string d = DateTime.Now.ToString();
                f1.date = new List<string>();
                f1.date.Add(d);
                f1.date.Add(d);
                f1.date.Add(d);
                f1.date.Add(d);
                f1.date.Add(d);
                f1.date.Add(d);
                f1.delay = true;
                f1.description = "dfgfdgd";
                f1.name = "test";
                f1.delayWeeks = "2";
                f1.dogfoodToProdWeeks = "3";
                f1.exitreviewToDoneWeeks = "5";
                f1.prodToExitreviewWeeks = "4";
                f1.newToActiveWeeks = "2";
                f1.weeks = "4";
                list.Add(f1);
            }
            return list;
        }
        public string gjson()
        {
            //  JData obj1 = new JData(new DateTime(2015, 04, 05), 12);
            //  JData obj2 = new JData(new DateTime(2015, 05, 05), 12);
            //  JData obj3 = new JData(new DateTime(2015, 07, 05), 12);
            //  JData obj = new JData(2, 12);
            // System.Text.StringBuilder builder = new System.Text.StringBuilder();
            //  List<JData> arr = new List<JData>();
            //  arr.Add(obj1);
            //  arr.Add(obj2);
            //  arr.Add(obj3);
            List<FeatureStatus> list = refresh();
            string json = new JavaScriptSerializer().Serialize(list);
            return json;
            // json.Serialize(obj, builder);
            // string s = builder.ToString();
            // return s;
            // json.Replace('\\', '');

            //   return json.Replace("\\", "");
            //    return json;
        }
        

        public List<Feature> queryFeatures(string stageSelected)
        {
           /*Feature f1 = new Feature();
            f1.name = "feature 1";
            f1.status = "Active";
            f1.process = "90%";
            f1.delay = false;
            f1.delayWeeks = "";
            f1.description = "has no description";
            f1.weeks = "+5";
            f1.date = new List<string>();
            f1.date.Add("1, 2, 2015");
            f1.date.Add("2, 2 ,2015");
            f1.date.Add("3, 2, 2015");
            f1.date.Add("4, 2, 2015");
            f1.date.Add("5, 2, 2015");
            f1.date.Add("6, 2, 2015");

            Feature f2 = new Feature();
            f2.name = "feature 2";
            f2.status = "Done";
            f2.process = "";
            f2.delay = false;
            f2.delayWeeks = "";
            f2.description = "has no description";
            f2.weeks = "";
            f2.date = new List<string>();
            f2.date.Add("1, 2, 2015");
            f2.date.Add("2, 2 ,2015");
            f2.date.Add("3, 2, 2015");
            f2.date.Add("4, 2, 2015");
            f2.date.Add("5, 2, 2015");
            f2.date.Add("6, 2, 2015");

            Feature f3 = new Feature();
            f3.name = "feature 3";
            f3.status = "Dogfood";
            f3.process = "";
            f3.delay = true;
            f3.delayWeeks = "-2";
            f3.description = "has no description";
            f3.weeks = " -3 ";
            f3.date = new List<string>();
            f3.date.Add("1, 2, 2015");
            f3.date.Add("2, 2 ,2015");
            f3.date.Add("3, 2, 2015");
            f3.date.Add("4, 2, 2015");
            f3.date.Add("5, 2, 2015");
            f3.date.Add("6, 2, 2015");

            List<Feature> list = new List<Feature>();
            list.Add(f1);
            list.Add(f2);
            list.Add(f3);
          */
            List<Feature> list = getStatus(stageSelected);/**/
            return list;
        }
        
        public string getFeatures(string stageSelected)
        {
            List<Feature> list = queryFeatures(stageSelected);
            string json = new JavaScriptSerializer().Serialize(list);
            return json;
        }
        public ActionResult responseFeatures(object sender, EventArgs e)
        {
            string stageSelected = Request["stage"].ToString();
            var res = getFeatures(stageSelected);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public List<StageWeeks> queryFeatureWeeks()
        {
            /*       featureWeek f1 = new featureWeek();
                 f1.featureName = "feature 1";
                 f1.currentStageWeek = "3";
                 f1.nextStageWeek = "4";
                 f1.delayWeek = "0";

                 featureWeek f2 = new featureWeek();
                 f2.featureName = "feature 2";
                 f2.currentStageWeek = "9";
                 f2.nextStageWeek = "1";
                 f2.delayWeek = "0";

                 featureWeek f3 = new featureWeek();
                 f3.featureName = "feature 3";
                 f3.currentStageWeek = "12";
                 f3.nextStageWeek = "5";
                 f3.delayWeek = "4";

                 List<featureWeek> list = new List<featureWeek>();
                 list.Add(f1);
                 list.Add(f2);
                 list.Add(f3);
               return list;*/

            

            StageWeeks f1 = new StageWeeks();
            f1.ID = "001";
            f1.name = "feature 1";
            f1.newWeeks = "4";
            f1.activeWeeks = "8";
            f1.delayWeeks = "0";

            StageWeeks f2 = new StageWeeks();
            f2.ID = "002";
            f2.name = "feature 2";
            f2.newWeeks = "3";
            f2.activeWeeks = "8";
            f2.delayWeeks = "0";

            StageWeeks f3 = new StageWeeks();
            f3.ID = "001";
            f3.name = "feature 1";
            f3.newWeeks = "2";
            f3.activeWeeks = "5";
            f3.delayWeeks = "3";

            List<StageWeeks> list = new List<StageWeeks>();
            list.Add(f1);
            list.Add(f2);
            list.Add(f3);
            return list;
        }
        public ActionResult responseFeatureWeeks()
        {
            List<StageWeeks> list = queryFeatureWeeks();
            string res = new JavaScriptSerializer().Serialize(list);
            return Json(res, JsonRequestBehavior.AllowGet);
        }

        public List<featurePercents> queryFeaturePercents()
        {
            featurePercents f1 = new featurePercents();
            f1.featureName = "feature 1";
            f1.prevPercent = 40;
            f1.curPercent = 60;

            featurePercents f2 = new featurePercents();
            f2.featureName = "feature 2";
            f2.prevPercent = 20;
            f2.curPercent = 30;

            featurePercents f3 = new featurePercents();
            f3.featureName = "feature 3";
            f3.prevPercent = 40;
            f3.curPercent = 40;

            featurePercents f4 = new featurePercents();
            f4.featureName = "feature 4";
            f4.prevPercent = 50;
            f4.curPercent = 90;

            featurePercents f5 = new featurePercents();
            f5.featureName = "feature 5";
            f5.prevPercent = 70;
            f5.curPercent = 100;

            List<featurePercents> list = new List<featurePercents>();
            list.Add(f1);
            list.Add(f2);
            list.Add(f3);
            list.Add(f4);
            list.Add(f5);
            return list;
        }
        public ActionResult responseFeaturePercents()
        {
            List<featurePercents> list = queryFeaturePercents();
            string res = new JavaScriptSerializer().Serialize(list);
            return Json(res, JsonRequestBehavior.AllowGet);
        }



        public ActionResult responseFC()
        {
            List<FC> list = queryFC();
            string res = new JavaScriptSerializer().Serialize(list);
            return Json(res, JsonRequestBehavior.AllowGet);
        }

        public List<FC> queryFC()
        {
            FC f1 = new FC();
            f1.featureName = "feature 1";
            f1.personName = "xiaozhang";
            f1.releaseDate = new DateTime(2015, 4, 5);

            FC f2 = new FC();
            f2.featureName = "feature 2";
            f2.personName = "xiaoming";
            f2.releaseDate = new DateTime(2015, 6, 6);

            FC f3 = new FC();
            f3.featureName = "feature 3";
            f3.personName = "xiaohua";
            f3.releaseDate = new DateTime(2015, 7, 3);

            FC f4 = new FC();
            f4.featureName = "feature 4";
            f4.personName = "xiaoliu";
            f4.releaseDate = new DateTime(2015, 5, 10);

            FC f5 = new FC();
            f5.featureName = "feature 4";
            f5.personName = "xiaozhang";
            f5.releaseDate = new DateTime(2015, 9, 18);


            FC f6 = new FC();
            f6.featureName = "feature 3";
            f6.personName = "xiaozhang";
            f6.releaseDate = new DateTime(2015, 3, 20);


            FC f7 = new FC();
            f7.featureName = "feature 3";
            f7.personName = "xiaoliu";
            f7.releaseDate = new DateTime(2015, 8, 10);


            List<FC> list = new List<FC>();
            list.Add(f1);
            list.Add(f2);
            list.Add(f3);
            list.Add(f4);
            list.Add(f5);
            list.Add(f6);
            list.Add(f7);
            return list;
        }

        public ActionResult responseCommingTable()
        {
            List<CommingTable> list = queryCommingTable();
            string res = new JavaScriptSerializer().Serialize(list);
            return Json(res, JsonRequestBehavior.AllowGet);
        }

        public List<CommingTable> queryCommingTable()
        {
           
               CommingTable f1 = new CommingTable();
               f1.featureName = "feature 1";
               f1.commingDate = "9, 6, 2015";
               f1.week = 2;

               CommingTable f2 = new CommingTable();
               f2.featureName = "feature 2";
               f2.commingDate = "9, 9, 2015";
               f2.week = 3;

               CommingTable f3 = new CommingTable();
               f3.featureName = "feature 3";
               f3.commingDate = "10, 3, 2015";
               f3.week = 1;

               CommingTable f4 = new CommingTable();
               f4.featureName = "feature 4";
               f4.commingDate = "10, 8, 2015";
               f4.week = 5;

               CommingTable f5 = new CommingTable();
               f5.featureName = "feature 5";
               f5.commingDate = "11, 6, 2015";
               f5.week = 1;

               CommingTable f6 = new CommingTable();
               f6.featureName = "feature 6";
               f6.commingDate = "12, 9, 2015";
               f6.week = 4;

               List<CommingTable> list = new List<CommingTable>();
               list.Add(f1);
               list.Add(f2);
               list.Add(f3);
               list.Add(f4);
               list.Add(f5);
               list.Add(f6);
               return list;
            /*   */
        }


        public ActionResult responseGoOutTable(object sender, EventArgs e)
        {
            string startDate = "";
            int s = 0;
            string endDate = "";
            if (Request.QueryString["startDate"] == null) {
                startDate = DateTime.Now.AddDays(-DateTime.Now.Day + 1).ToString();
                endDate = DateTime.Now.AddMonths(1).AddDays(-DateTime.Now.AddMonths(1).Day).ToString();
                s = 0;

            }
            else { 
                  startDate = Request["startDate"].ToString();
                  endDate = Request["endDate"].ToString();
                s = 1;
            }
            List<GoOutTable> list = queryGoOutTable(startDate, endDate, s);
            string res = new JavaScriptSerializer().Serialize(list);
            return Json(res, JsonRequestBehavior.AllowGet);
        }

        public List<GoOutTable> queryGoOutTable(string startDate, string endDate, int s)
        {
            
            string coonString = @"SERVER=TFSOFFICEWH;UID=jipinshi;Trusted_Connection=Yes;APP=Microsoft Office 2013;WSID=Agile-Tracking";
            SqlConnection connection = new SqlConnection(coonString);
            connection.Open();
            // MessageBox.Show("Open database success!");
            string queryStr = @" SELECT " +
      @" CAST(CWIV.[TfsMigrationTool_ReflectedWorkItemId] as int) as 'ID' , " +
      @"　CWIV.[System_Title] as 'name'　" +
       @", CWIV.[Microsoft_VSTS_Scheduling_FinishDate] as 'GoOutDate' " +
     @" ,DATEPART(WEEK, GETDATE()) - DATEPART(WEEK, dateadd(ms, -1, DATEADD(mm, DATEDIFF(m, 0, getdate()), 0))) + 1 as 'weekOfMonth' " +
     @" ,DATEPART(WEEK, CWIV.[Microsoft_VSTS_Scheduling_FinishDate]) - DATEPART(WEEK, dateadd(ms, -1, DATEADD(mm, DATEDIFF(m, 0, getdate()), 0))) + 1 as 'weekOfClose' " +
    @" FROM[Tfs_Warehouse].[dbo].[CurrentWorkItemView] as CWIV " +
    @"  WHERE " +
    @" CWIV.[System_WorkItemType] in ('Feature') " +
    @" and CWIV.[System_State] in ('New', 'Active', 'Closed', 'Pending') " +
   @" and CWIV.[AreaName] = 'OAS' ";
            if (s == 0) {
                //    @" and CWIV.[Microsoft_VSTS_Scheduling_FinishDate] between dateadd(ms,-1, DATEADD(mm, DATEDIFF(m,0, getdate()), 0)) and dateadd(ms,-3, DATEADD(mm, DATEDIFF(m,0, getdate())+1, 0)) " +
                queryStr += @" and CWIV.[Microsoft_VSTS_Scheduling_FinishDate] between convert(datetime, '" + startDate + "', 101)" + " and convert(datetime, '" + endDate + "', 101)";
    }
            else {
                queryStr += @" and CWIV.[Microsoft_VSTS_Scheduling_FinishDate] between convert(datetime, '" + startDate + "', 107)" + " and convert(datetime, '" + endDate + "', 107)";
            }
            queryStr += @" ORDER BY CAST(CWIV.[TfsMigrationTool_ReflectedWorkItemId] as int ) ";
            SqlCommand selectCMD = new SqlCommand(queryStr, connection);

            SqlDataAdapter custDA = new SqlDataAdapter();
            custDA.SelectCommand = selectCMD;

            DataSet custDS = new DataSet();
            custDA.Fill(custDS);
            List<GoOutTable> list = new List<GoOutTable>();
            foreach (DataRow mDr in custDS.Tables[0].Rows)
            {
                GoOutTable go = new GoOutTable();
                go.id = mDr["ID"].ToString();
                go.featureName = mDr["name"].ToString();
                go.goOutDate = mDr["GoOutDate"].ToString();
                go.week = int.Parse(mDr["weekOfClose"].ToString());
                go.weekOfMonth = mDr["weekOfMonth"].ToString();
                list.Add(go);
            }
            return list;
           /*        GoOutTable f1 = new GoOutTable();
                     f1.featureName = "feature 1";
                     f1.goOutDate = "8, 6, 2015";
                     f1.week = 1;
                     f1.id = "001";

                     GoOutTable f2 = new GoOutTable();
                     f2.featureName = "feature 2";
                     f2.goOutDate = "9, 16, 2015";
                     f2.week = 3;
                     f2.id = "002";

                     GoOutTable f3 = new GoOutTable();
                     f3.featureName = "feature 3";
                     f3.goOutDate = "9, 26, 2015";
                     f3.week = 4;
                     f3.id = "003";

                     GoOutTable f4 = new GoOutTable();
                     f4.featureName = "feature 4";
                     f4.goOutDate = "10, 6, 2015";
                     f4.week = 2;
                     f4.id = "004";

                     GoOutTable f5 = new GoOutTable();
                     f5.featureName = "feature 5";
                     f5.goOutDate = "11, 6, 2015";
                     f5.week = 2;
                     f5.id = "005";

                     List<GoOutTable> list = new List<GoOutTable>();
                     list.Add(f1);
                     list.Add(f2);
                     list.Add(f3);
                     list.Add(f4);
                     list.Add(f5);
                     return list;
               */       
        }

        public ActionResult responseTFSRelease()
        {
            List<TFSRelease> list = queryTFSRelease();
            string res = new JavaScriptSerializer().Serialize(list);
            return Json(res, JsonRequestBehavior.AllowGet);
        }

        public List<TFSRelease> queryTFSRelease()
        {
            TFSRelease f1 = new TFSRelease();
            f1.releaseNum = "1.0";
            f1.releaseDate = "1, 2, 2015";

            TFSRelease f2 = new TFSRelease();
            f2.releaseNum = "1.4";
            f2.releaseDate = "2, 2, 2015";

            TFSRelease f3 = new TFSRelease();
            f3.releaseNum = "2.0";
            f3.releaseDate = "4, 5, 2015";

            TFSRelease f4 = new TFSRelease();
            f4.releaseNum = "3.0";
            f4.releaseDate = "7, 2, 2015";


            List<TFSRelease> list = new List<TFSRelease>();
            list.Add(f1);
            list.Add(f2);
            list.Add(f3);
            list.Add(f4);
            return list;
        }

        public ActionResult responseNeedResource()
        {
            List<needResource> list = queryNeedResource();
            string res = new JavaScriptSerializer().Serialize(list);
            return Json(res, JsonRequestBehavior.AllowGet);
        }

        public List<needResource> queryNeedResource()
        {
            needResource f1 = new needResource();
            f1.featureName = "feature 1";
            f1.personNeed = 1;

            needResource f2 = new needResource();
            f2.featureName = "feature 2";
            f2.personNeed = 2;

            needResource f3 = new needResource();
            f3.featureName = "feature 3";
            f3.personNeed = 3;

            needResource f4 = new needResource();
            f4.featureName = "feature 4";
            f4.personNeed = 4;


            List<needResource> list = new List<needResource>();
            list.Add(f1);
            list.Add(f2);
            list.Add(f3);
            list.Add(f4);
            return list;
        }

        public ActionResult responsePersonFeature()
        {
            List<personFeature> list = queryPersonFeature();
            string res = new JavaScriptSerializer().Serialize(list);
            return Json(res, JsonRequestBehavior.AllowGet);
        }

        public List<personFeature> queryPersonFeature()
        {

            personFeature f1 = new personFeature();
            f1.pair = new List<featureReleasePair>();
            f1.name = "xiaoming";
            featureReleasePair t1 = new featureReleasePair();
            t1.featureName = "feature 1";
            t1.releaseDate = "5, 6, 2015";
            featureReleasePair t2 = new featureReleasePair();
            t2.featureName = "feature 4";
            t2.releaseDate = "7, 6, 2015";
            featureReleasePair t3 = new featureReleasePair();
            t3.featureName = "feature 7";
            t3.releaseDate = "8, 8, 2015";
            f1.pair.Add(t1);
            f1.pair.Add(t2);
            f1.pair.Add(t3);

            personFeature f2 = new personFeature();
            f2.pair = new List<featureReleasePair>();
            f2.name = "xiaozhang";
            featureReleasePair tt1 = new featureReleasePair();
            tt1.featureName = "feature 1";
            tt1.releaseDate = "3, 9, 2015";
            featureReleasePair tt2 = new featureReleasePair();
            tt2.featureName = "feature 3";
            tt2.releaseDate = "2, 1, 2015";
            featureReleasePair tt3 = new featureReleasePair();
            tt3.featureName = "feature 5";
            tt3.releaseDate = "9, 7, 2015";
            f2.pair.Add(tt1);
            f2.pair.Add(tt2);
            f2.pair.Add(tt3);

            personFeature f3 = new personFeature();
            f3.pair = new List<featureReleasePair>();
            f3.name = "xiaohua";
            featureReleasePair ttt1 = new featureReleasePair();
            ttt1.featureName = "feature 2";
            ttt1.releaseDate = "5, 9, 2015";
            featureReleasePair ttt2 = new featureReleasePair();
            ttt2.featureName = "feature 4";
            ttt2.releaseDate = "4, 1, 2015";
            featureReleasePair ttt3 = new featureReleasePair();
            ttt3.featureName = "feature 5";
            ttt3.releaseDate = "9, 8, 2015";
            f3.pair.Add(ttt1);
            f3.pair.Add(ttt2);
            f3.pair.Add(ttt3);


            List<personFeature> list = new List<personFeature>();
            list.Add(f1);
            list.Add(f2);
            list.Add(f3);
            return list;
        }

        public ActionResult responseFeatureAttr()
        {
            List<featureAttr> list = queryFeatureAttr();
            string res = new JavaScriptSerializer().Serialize(list);
            return Json(res, JsonRequestBehavior.AllowGet);
        }

        public List<featureAttr> queryFeatureAttr()
        {
            featureAttr f1 = new featureAttr();
            f1.featureName = "feature 1";
            f1.pair = new List<personReleasePair>();
            personReleasePair t1 = new personReleasePair();
            t1.personName = "xiaoming";
            t1.releaseDate = "12, 5, 2015";
            personReleasePair t2 = new personReleasePair();
            t2.personName = "xiaozhang";
            t2.releaseDate = "5, 5, 2015";
            personReleasePair t3 = new personReleasePair();
            t3.personName = "xiaozhang";
            t3.releaseDate = "6, 7, 2015";
            f1.pair.Add(t1);
            f1.pair.Add(t2);
            f1.pair.Add(t3);

            featureAttr f2 = new featureAttr();
            f2.featureName = "feature 2";
            f2.pair = new List<personReleasePair>();
            personReleasePair tt1 = new personReleasePair();
            tt1.personName = "xiaoming";
            tt1.releaseDate = "12, 5, 2015";
            personReleasePair tt2 = new personReleasePair();
            tt2.personName = "xiaozhang";
            tt2.releaseDate = "5, 5, 2015";
            personReleasePair tt3 = new personReleasePair();
            tt3.personName = "xiaozhang";
            tt3.releaseDate = "6, 7, 2015";
            f2.pair.Add(tt1);
            f2.pair.Add(tt2);
            f2.pair.Add(tt3);

            featureAttr f3 = new featureAttr();
            f3.featureName = "feature 3";
            f3.pair = new List<personReleasePair>();
            personReleasePair ttt1 = new personReleasePair();
            ttt1.personName = "xiaoming";
            ttt1.releaseDate = "12, 5, 2015";
            personReleasePair ttt2 = new personReleasePair();
            ttt2.personName = "xiaozhang";
            ttt2.releaseDate = "5, 5, 2015";
            personReleasePair ttt3 = new personReleasePair();
            ttt3.personName = "xiaozhang";
            ttt3.releaseDate = "6, 7, 2015";
            f3.pair.Add(t1);
            f3.pair.Add(t2);
            f3.pair.Add(t3);

            List<featureAttr> list = new List<featureAttr>();
            list.Add(f1);
            list.Add(f2);
            list.Add(f3);
            return list;
        }
    }









    public class JData
    {
        public JData(DateTime d, int w)
        {
            date = d;
            week = w;
        }

        public DateTime date
        {
            get;
            set;
        }
        public int week
        {
            get;
            set;
        }
    }

    public class FeatureStatus
    {
        public string featureName
        {
            get;
            set;
        }
        public string featureStatus
        {
            get;
            set;
        }
        public string featureStatusDescription
        {
            get;
            set;
        }
        public string weeksInCurrentStatus
        {
            get;
            set;
        }
        public string weeksDisNextStatus
        {
            get;
            set;
        }

    }
    public class Feature
    {
        public string name
        {
            get;
            set;
        }
        public string status
        {
            get;
            set;
        }
        public string process
        {
            get;
            set;
        }

        public bool delay
        {
            get;
            set;
        }
        public string description
        {
            get;
            set;
        }
        public List<string> date
        {
            get;
            set;
        }
        public string delayWeeks
        {
            get;
            set;
        }
        public string weeks
        {
            get;
            set;
        }
        public string newToActiveWeeks
        {
            get;
            set;
        }
        public string activeToDoogfoodWeeks
        {
            get;
            set;
        }
        public string dogfoodToProdWeeks
        {
            get;
            set;
        }
        public string prodToExitreviewWeeks
        {
            get;
            set;
        }
        public string exitreviewToDoneWeeks
        {
            get;
            set;
        }
    }

    public class helpFR
    {
        public string featureTitle
        {
            get;
            set;
        }
        public string releaseDate
        {
            get;
            set;
        }
    }
    public class people
    {
        public string name
        {
            get;
            set;
        }
    }

    public class featureWeek
    {
        public string featureName
        {
            get;
            set;
        }
        public string currentStageWeek
        {
            get;
            set;
        }
        public string nextStageWeek
        {
            get;
            set;
        }
        public string delayWeek
        {
            get;
            set;
        }
    }

    public class featurePercents
    {
        public string featureName
        {
            get;
            set;
        }
        public float prevPercent
        {
            get;
            set;
        }
        public float curPercent
        {
            get;
            set;
        }
    }
    public class FC
    {
        public string personName
        {
            get;
            set;
        }
        public string featureName
        {
            get;
            set;
        }
        public DateTime releaseDate
        {
            get;
            set;
        }
    }
    public class CommingTable
    {
        public string featureName
        {
            get;
            set;
        }
        public string commingDate
        {
            get;
            set;
        }
        public int week
        {
            get;
            set;
        }
    }

    public class GoOutTable
    {
        public string id
        {
            get;
            set;
        }
        public string featureName
        {
            get;
            set;
        }
        public string goOutDate
        {
            get;
            set;
        }
        public int week
        {
            get;
            set;
        }

        public string weekOfMonth
        {
            get;
            set;
        }
    }

    public class TFSRelease
    {
        public string releaseNum
        {
            get;
            set;
        }
        public string releaseDate
        {
            get;
            set;
        }
    }
    public class needResource
    {
        public string featureName
        {
            get;
            set;
        }
        public int personNeed
        {
            get;
            set;
        }
    }

    public class featureReleasePair
    {
        public string featureName
        {
            get;
            set;
        }
        public string releaseDate
        {
            get;
            set;
        }
    }
    public class personFeature
    {
        public string name
        {
            get;
            set;
        }
        public List<featureReleasePair> pair
        {
            get;
            set;
        }
    }

    public class personReleasePair
    {
        public string personName
        {
            get;
            set;
        }
        public string releaseDate
        {
            get;
            set;
        }
    }
    public class featureAttr
    {
        public string featureName
        {
            get;
            set;
        }
        public List<personReleasePair> pair
        {
            get;
            set;
        }
    }

    public class StageWeeks
    {
        public string ID
        {
            get;
            set;
        }
        public string name
        {
            get;
            set;
        }
        public string newWeeks
        {
            get;
            set;
        }
        public string activeWeeks
        {
            get;
            set;
        }
        public string delayWeeks
        {
            get;
            set;
        }
    }
}


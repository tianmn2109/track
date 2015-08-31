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
        public ActionResult Done()
        {
            return View();
        }
        public void refreshComming(object sender, EventArgs e)
        {
            string startDate = Request["startDate"].ToString();
            string endDate = Request["endDate"].ToString();
            Console.WriteLine(startDate + " -->  " + endDate);
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
                    feature.featureStatus = "100% Done in Prod.";
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
                    feature.featureStatusDescription = "Completed " + process + "% Prod.";
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
            //     MessageBox.Show("Close database success !");
            //return View();
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


        public List<Feature> queryFeatures()
        {
            Feature f1 = new Feature();
            f1.name = "feature 1";
            f1.status = "Approved";
            f1.process = "90%";
            f1.delay = false;
            f1.delayWeeks = "";
            f1.description = "has no description";

            Feature f2 = new Feature();
            f2.name = "feature 2";
            f2.status = "Done";
            f2.process = "";
            f2.delay = false;
            f2.delayWeeks = "";
            f2.description = "has no description";

            Feature f3 = new Feature();
            f3.name = "feature 3";
            f3.status = "Dogfood";
            f3.process = "";
            f3.delay = true;
            f3.delayWeeks = "2";
            f3.description = "has no description";
            List<Feature> list = new List<Feature>();
            list.Add(f1);
            list.Add(f2);
            list.Add(f3);
            return list;
        }
        public string getFeatures()
        {
            List<Feature> list = queryFeatures();
            string json = new JavaScriptSerializer().Serialize(list);
            return json;
        }
        public ActionResult responseFeatures()
        {
            var res = getFeatures();
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public List<featureWeek> queryFeatureWeeks()
        {
            featureWeek f1 = new featureWeek();
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
            return list;
        }
        public ActionResult responseFeatureWeeks()
        {
            List<featureWeek> list = queryFeatureWeeks();
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
        public string delayWeeks
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
}


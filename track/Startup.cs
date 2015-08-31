using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(track.Startup))]
namespace track
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}

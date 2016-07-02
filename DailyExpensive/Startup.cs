using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(DailyExpensive.Startup))]
namespace DailyExpensive
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}

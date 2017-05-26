using Microsoft.Rest;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http.Filters;

namespace ContactsList.API.Filters
{
    public class HttpOperationExceptionFilterAttribute : ExceptionFilterAttribute
    {
        public override void OnException(HttpActionExecutedContext context)
        {
            if (context.Exception is HttpOperationException)
            {
                var ex = (HttpOperationException)context.Exception;
                context.Response = ex.Response;
            }
        }
    }
}
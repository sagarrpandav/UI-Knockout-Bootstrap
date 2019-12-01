function ideaBaseRenderer(instance , td , row , col , prop , value , cellProperties)
{
    switch (prop)
    {
        case "ideaSummary" :
            return ideaSummaryRenderer(instance , td , row , col , prop , value , cellProperties);
        case "ideaDetails" :
            return ideaDetailsRenderer(instance , td , row , col , prop , value , cellProperties);
        case "categoryName" :
            return ideaCategoryRenderer(instance , td , row , col , prop , value , cellProperties);
        case "teamMemberNames" :
            return ideaMemberRenderer(instance , td , row , col , prop , value , cellProperties);
        case "totalLikes" :
            return ideaLikesRenderer(instance , td , row , col , prop , value , cellProperties);
        case "liked" :
            return likeButtonRenderer(instance , td , row , col , prop , value , cellProperties);
        case "editButton" :
            return editIdeaButtonRenderer(instance , td , row , col , prop , value , cellProperties);
    }
};
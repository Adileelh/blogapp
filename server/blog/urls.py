from django.urls import path
from blog.views import BlogPostViewSet, CommentViewSet, create_blog_post

app_name = "blog"

urlpatterns = [
    path('blog-posts', BlogPostViewSet.as_view({'get': 'list', 'post': 'create'})),
    path('blog-posts/<int:pk>', BlogPostViewSet.as_view({'get': 'retrieve', 'put': 'update', 'patch': 'partial_update', 'delete': 'destroy'})),
    path('comments', CommentViewSet.as_view({'get': 'list', 'post': 'create'})),
    path('comments/<int:pk>', CommentViewSet.as_view({'get': 'retrieve', 'put': 'update', 'patch': 'partial_update', 'delete': 'destroy'})),
    path('generate_blog', create_blog_post),
]
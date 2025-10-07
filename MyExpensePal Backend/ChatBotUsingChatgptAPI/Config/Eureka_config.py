import py_eureka_client.eureka_client as eureka_client


def register_with_eureka():
    eureka_server_url = "http://localhost:8761/eureka"

    eureka_client.init(
        eureka_server=eureka_server_url,
        app_name="CHAT-SERVICE",
        instance_port=8087,
        # instance_ip="127.0.0.1",
        instance_host="localhost",
        prefer_same_zone=True,
        renewal_interval_in_secs=30,
        duration_in_secs=90
    )

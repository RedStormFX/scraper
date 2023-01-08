run: 
	docker run -d -p 3001:3001  --rm --name scraper-service redstormfx/scraper-service:0510
stop: 
	docker stop scraper-service
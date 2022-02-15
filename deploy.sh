#!/bin/bash
docker buildx build -t ats .
docker buildx build --platform=linux/amd64 -t ats .
docker build --platform linux/amd64 -t ats .

aws ecr create-repository --repository-name ats --region ap-south-1

docker tag ats 407867057075.dkr.ecr.ap-south-1.amazonaws.com/ats

# aws ecr get-login-password --region ap-south-1

aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin 407867057075.dkr.ecr.ap-south-1.amazonaws.com

docker push 407867057075.dkr.ecr.ap-south-1.amazonaws.com/ats



ssh -i /path/my-key-pair.pem ec2-user@ec2-13-233-70-246.ap-south-1.compute.amazonaws.com
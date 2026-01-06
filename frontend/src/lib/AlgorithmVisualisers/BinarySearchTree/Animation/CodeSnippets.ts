export const insertCode = `struct node *insert(struct node *node, int value) {
    if (node == NULL)
        return create_new_node(value);

    if (value < node->value)
        node->left = insert(node->left, value);
    else if (value > node->value)
        node->right = insert(node->right, value);
    return node;
}`;

export const deleteCode = `struct node *delete(struct node *node, int value) {
    if (node == NULL) {
        return node;
    }

    struct node *newRoot = node;
    if (value < node->value) {
        node->left = delete(node->left, value);
    } else if (value > node->value) {
        node->right = delete(node->right, value);
    } else {
        if (node->left == NULL && node->right == NULL) {
            newRoot = NULL;
        } else if (node->left == NULL) {
            newRoot = node->right;
        } else if (node->right == NULL) {
            newRoot = node->left;
        } else {
            newRoot = tree_join(node->left, node->right);
        }
        free(node);
    }
    return newRoot;
}`;

export const searchCode = `struct node *search(struct node *node, int value) {
    if (node == NULL || value == node->value) {
        return node;
    }
    if (value < node->value)
        return search(node->left, value);
    }
    return search(node->right, value);
}`;

export const rotateLeftCode = `struct node *rotateLeft(struct node *node, int value) {
    if (value == node->value) {
        if (node->right == NULL) {
            return node;
        }
        struct node *newRoot = node->right;
        node->right = newRoot->left;
        newRoot->left = node;
        return newRoot;
    } else if (value < node->value) {
        node->left = rotateLeft(node->left, value);
    } else if (value > node->value) {
        node->right = rotateLeft(node->right, value);
    }
    return node;
}`;

export const rotateRightCode = `struct node *rotateRight(struce node *node, int value) {
    if (value == node->value) {
        if (node->left == NULL) {
            return node;
        }
        struct node *newRoot = node->left;
        node->left = newRoot->right;
        newRoot->right = node;
        return newRoot;
    } else if (value < node->value) {
        node->left = rotateRight(node->left, value);
    } else if (value > node->value) {
        node->right = rotateRight(node->right, value);
    }
    return node;
}`;

export const preorderTraversalCode = `void preorderTraversal(struct node *node) {
    if (node == NULL) {
        return;
    }

    printf("%d ", node->value);
    preorderTraversal(node->left);
    preorderTraversal(node->right);
}`;

export const inorderTraversalCode = `void inorderTraversal(struct node *node) {
    if (node == NULL) {
        return;
    }

    inorderTraversal(node->left);
    printf("%d ", node->value);
    inorderTraversal(node->right);
}`;

export const postorderTraversalCode = `void postorderTraversal(struct node *node) {
    if (node == NULL) {
        return;
    }

    postorderTraversal(node->left);
    postorderTraversal(node->right);
    printf("%d ", node->value);
}`;